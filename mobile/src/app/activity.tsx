
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://10.50.61.74:5000';

type Activity = {
  id: number;
  title: string;
  duration: string;
  durationMinutes: number;
  date: string;
};

export default function ActivityScreen() {
  const router = useRouter();

  const [studentId, setStudentId] = useState<number | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [activityDate, setActivityDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadActivities = useCallback(async (id: number) => {
    try {
      const response = await fetch(
        `${API_URL}/api/activities?student_id=${id}`
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Could not load study activities.');
      }

      setActivities(result.activities || []);
    } catch (error) {
      Alert.alert(
        'Unable to load activities',
        error instanceof Error ? error.message : 'Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function initialise() {
      try {
        const savedSession = await SecureStore.getItemAsync('studentSession');

        if (!savedSession) {
          router.replace('/login');
          return;
        }

        const student = JSON.parse(savedSession);
        const id = Number(student.student_id);

        if (!id) {
          router.replace('/login');
          return;
        }

        setStudentId(id);
        await loadActivities(id);
      } catch {
        Alert.alert('Session error', 'Please connect to your account again.');
        setLoading(false);
      }
    }

    initialise();
  }, [loadActivities, router]);

  async function saveActivity() {
    const minutes = Number(duration);

    if (!title.trim()) {
      Alert.alert('Missing title', 'Enter what you studied.');
      return;
    }

    if (!duration.trim() || !Number.isInteger(minutes) || minutes <= 0) {
      Alert.alert('Invalid duration', 'Enter a positive number of minutes.');
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(activityDate)) {
      Alert.alert('Invalid date', 'Use the format YYYY-MM-DD.');
      return;
    }

    if (!studentId) {
      Alert.alert('Session expired', 'Please connect to your account again.');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`${API_URL}/api/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: studentId,
          title: title.trim(),
          duration_minutes: minutes,
          date: activityDate,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Could not save the study session.');
      }

      setTitle('');
      setDuration('');
      await loadActivities(studentId);

      Alert.alert('Session saved', 'Your study activity has been recorded.');
    } catch (error) {
      Alert.alert(
        'Unable to save',
        error instanceof Error ? error.message : 'Please try again.'
      );
    } finally {
      setSaving(false);
    }
  }

  function deleteActivity(activity: Activity) {
    if (!studentId) return;

    Alert.alert(
      'Delete study session',
      `Delete "${activity.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                `${API_URL}/api/activities/${activity.id}?student_id=${studentId}`,
                { method: 'DELETE' }
              );

              const result = await response.json();

              if (!response.ok) {
                throw new Error(result.error || 'Could not delete the session.');
              }

              await loadActivities(studentId);
            } catch (error) {
              Alert.alert(
                'Delete failed',
                error instanceof Error ? error.message : 'Please try again.'
              );
            }
          },
        },
      ]
    );
  }

  const totalMinutes = activities.reduce(
    (total, item) => total + Number(item.durationMinutes || 0),
    0
  );

  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹  Back to dashboard</Text>
        </Pressable>

        <Text style={styles.eyebrow}>STUDY RECORD</Text>
        <Text style={styles.heading}>Activity tracking</Text>
        <Text style={styles.subtitle}>
          Keep a record of the time you spend studying.
        </Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>TOTAL STUDY TIME</Text>
          <Text style={styles.summaryNumber}>
            {hours}h {remainingMinutes}m
          </Text>
          <Text style={styles.summaryDescription}>
            Across {activities.length} recorded sessions
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Record a study session</Text>

          <Text style={styles.inputLabel}>What did you study?</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Database Systems revision"
            placeholderTextColor="#9993A5"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.inputLabel}>Duration (minutes)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 60"
            placeholderTextColor="#9993A5"
            keyboardType="number-pad"
            value={duration}
            onChangeText={setDuration}
          />

          <Text style={styles.inputLabel}>Study date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#9993A5"
            value={activityDate}
            onChangeText={setActivityDate}
          />

          <Pressable
            style={[styles.saveButton, saving && styles.disabledButton]}
            onPress={saveActivity}
            disabled={saving}
          >
            <Text style={styles.saveButtonText}>
              {saving ? 'Saving...' : 'Save study session'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Recent activity</Text>
          <Text style={styles.sessionCount}>
            {activities.length} sessions
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#7055C8" />
        ) : activities.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No study sessions yet</Text>
            <Text style={styles.emptyText}>
              Your recorded study sessions will appear here.
            </Text>
          </View>
        ) : (
          activities.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDate}>{activity.date}</Text>
              </View>

              <View style={styles.activityRight}>
                <Text style={styles.activityDuration}>
                  {activity.duration}
                </Text>
                <Pressable
                  onPress={() => deleteActivity(activity)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  content: {
    padding: 22,
    paddingBottom: 45,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 28,
  },
  backText: {
    color: '#7055C8',
    fontSize: 15,
    fontWeight: '600',
  },
  eyebrow: {
    color: '#806CB7',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 9,
  },
  heading: {
    color: '#252238',
    fontSize: 29,
    fontWeight: '700',
  },
  subtitle: {
    color: '#817B8D',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
    marginBottom: 22,
  },
  summaryCard: {
    backgroundColor: '#7055C8',
    borderRadius: 16,
    padding: 21,
    marginBottom: 22,
  },
  summaryLabel: {
    color: '#E9E2FF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  summaryNumber: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 10,
  },
  summaryDescription: {
    color: '#E9E2FF',
    fontSize: 12,
    marginTop: 5,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 19,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#ECE9F3',
  },
  sectionTitle: {
    color: '#29243B',
    fontSize: 18,
    fontWeight: '700',
  },
  inputLabel: {
    color: '#514B60',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 17,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FAF9FC',
    borderWidth: 1,
    borderColor: '#E7E3EF',
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 13,
    color: '#29243B',
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#7055C8',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sessionCount: {
    color: '#827C90',
    fontSize: 12,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 22,
    borderWidth: 1,
    borderColor: '#ECE9F3',
  },
  emptyTitle: {
    color: '#29243B',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 7,
  },
  emptyText: {
    color: '#817B8D',
    fontSize: 13,
    lineHeight: 20,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 16,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: '#ECE9F3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityDetails: {
    flex: 1,
    paddingRight: 10,
  },
  activityTitle: {
    color: '#29243B',
    fontSize: 14,
    fontWeight: '600',
  },
  activityDate: {
    color: '#817B8D',
    fontSize: 12,
    marginTop: 6,
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityDuration: {
    color: '#7055C8',
    fontSize: 14,
    fontWeight: '700',
  },
  deleteButton: {
    paddingVertical: 7,
    paddingHorizontal: 3,
    marginTop: 4,
  },
  deleteText: {
    color: '#B34E5B',
    fontSize: 11,
    fontWeight: '600',
  },
});

