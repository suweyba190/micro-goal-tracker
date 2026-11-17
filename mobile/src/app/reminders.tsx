
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';

const API_URL = 'http://10.50.61.74:5000';

type Student = {
  student_id: number;
  full_name: string;
  email: string;
};

type Reminder = {
  id: number;
  studentId: number;
  title: string;
  description: string;
  reminderDatetime: string;
  completed: boolean;
  createdAt: string;
};

export default function RemindersScreen() {
  const router = useRouter();

  const [student, setStudent] = useState<Student | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadReminders = useCallback(async () => {
    try {
      const savedSession = await SecureStore.getItemAsync('studentSession');

      if (!savedSession) {
        router.replace('/login');
        return;
      }

      const currentStudent: Student = JSON.parse(savedSession);
      setStudent(currentStudent);

      const response = await fetch(
        `${API_URL}/api/reminders?student_id=${currentStudent.student_id}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Could not load reminders.');
      }

      setReminders(result.reminders || []);
    } catch (error) {
      Alert.alert(
        'Reminders error',
        error instanceof Error ? error.message : 'Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadReminders();
  }, [loadReminders]);

  async function saveReminder() {
    if (!student) {
      Alert.alert('Please wait', 'Your account information is still loading.');
      return;
    }

    if (!title.trim() || !date.trim() || !time.trim()) {
      Alert.alert('Missing information', 'Enter a title, date and time.');
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date.trim())) {
      Alert.alert('Invalid date', 'Use the format YYYY-MM-DD.');
      return;
    }

    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time.trim())) {
      Alert.alert('Invalid time', 'Use the 24-hour format HH:mm, for example 14:30.');
      return;
    }

    const reminderDate = new Date(`${date.trim()}T${time.trim()}:00`);

    if (Number.isNaN(reminderDate.getTime())) {
      Alert.alert('Invalid date', 'Please enter a valid date.');
      return;
    }

    if (reminderDate.getTime() <= Date.now()) {
      Alert.alert('Choose a future time', 'Your reminder must be scheduled for a future date and time.');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`${API_URL}/api/reminders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: student.student_id,
          title: title.trim(),
          description: description.trim(),
          reminder_datetime: `${date.trim()}T${time.trim()}:00`,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Could not save your reminder.');
      }

      let notificationScheduled = false;

      try {
        const permission = await Notifications.requestPermissionsAsync();

        if (permission.granted) {
          const notificationId =
            await Notifications.scheduleNotificationAsync({
              content: {
                title: 'Study reminder',
                body: description.trim() || title.trim(),
                sound: true,
                data: {
                  reminderId: result.reminder_id,
                },
              },
              trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: reminderDate,
              },
            });

          await SecureStore.setItemAsync(
            `reminderNotification_${result.reminder_id}`,
            notificationId
          );

          notificationScheduled = true;
        }
      } catch {
        notificationScheduled = false;
      }

      setTitle('');
      setDescription('');
      setDate('');
      setTime('');

      await loadReminders();

      Alert.alert(
        'Reminder saved',
        notificationScheduled
          ? 'Your reminder has been saved and a notification has been scheduled.'
          : 'Your reminder has been saved, but a notification could not be scheduled. Check your notification permissions.'
      );
    } catch (error) {
      Alert.alert(
        'Could not save reminder',
        error instanceof Error ? error.message : 'Please try again.'
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleReminder(reminder: Reminder) {
    if (!student) return;

    try {
      const newCompletedStatus = !reminder.completed;

      const response = await fetch(
        `${API_URL}/api/reminders/${reminder.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            student_id: student.student_id,
            completed: newCompletedStatus,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Could not update reminder.');
      }

      if (newCompletedStatus) {
        const notificationId = await SecureStore.getItemAsync(
          `reminderNotification_${reminder.id}`
        );

        if (notificationId) {
          await Notifications.cancelScheduledNotificationAsync(notificationId);
          await SecureStore.deleteItemAsync(
            `reminderNotification_${reminder.id}`
          );
        }
      }

      await loadReminders();
    } catch (error) {
      Alert.alert(
        'Update failed',
        error instanceof Error ? error.message : 'Please try again.'
      );
    }
  }

  async function deleteReminder(reminder: Reminder) {
    if (!student) return;

    Alert.alert(
      'Delete reminder',
      `Are you sure you want to delete "${reminder.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                `${API_URL}/api/reminders/${reminder.id}?student_id=${student.student_id}`,
                { method: 'DELETE' }
              );

              const result = await response.json();

              if (!response.ok) {
                throw new Error(result.message || 'Could not delete reminder.');
              }

              const notificationId = await SecureStore.getItemAsync(
                `reminderNotification_${reminder.id}`
              );

              if (notificationId) {
                await Notifications.cancelScheduledNotificationAsync(notificationId);
                await SecureStore.deleteItemAsync(
                  `reminderNotification_${reminder.id}`
                );
              }

              await loadReminders();
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

  function formatReminderDate(value: string) {
    const reminderDate = new Date(value);

    return reminderDate.toLocaleString([], {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7055C8" />
        <Text style={styles.loadingText}>Loading reminders...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back to dashboard</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>Study reminders</Text>
        <Text style={styles.subtitle}>
          Plan your study sessions and receive notifications at the scheduled time.
        </Text>

        <View style={styles.formCard}>
          <Text style={styles.formHeading}>Create a reminder</Text>

          <Text style={styles.label}>Reminder title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Revise Database Systems"
            placeholderTextColor="#A29BAD"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Description (optional)</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="What do you plan to study?"
            placeholderTextColor="#A29BAD"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#A29BAD"
            value={date}
            onChangeText={setDate}
            keyboardType="numbers-and-punctuation"
          />

          <Text style={styles.label}>Time (24-hour format)</Text>
          <TextInput
            style={styles.input}
            placeholder="HH:mm"
            placeholderTextColor="#A29BAD"
            value={time}
            onChangeText={setTime}
            keyboardType="numbers-and-punctuation"
          />

          <TouchableOpacity
            style={[styles.saveButton, saving && styles.disabledButton]}
            onPress={saveReminder}
            disabled={saving}
            activeOpacity={0.85}
          >
            <Text style={styles.saveButtonText}>
              {saving ? 'Saving reminder...' : 'Save reminder'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.listHeading}>Your reminders</Text>
          <Text style={styles.reminderCount}>{reminders.length}</Text>
        </View>

        {reminders.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyHeading}>No reminders yet</Text>
            <Text style={styles.emptyText}>
              Create a reminder above to plan your next study session.
            </Text>
          </View>
        ) : (
          reminders.map((reminder) => (
            <View
              key={reminder.id}
              style={[
                styles.reminderCard,
                reminder.completed && styles.completedCard,
              ]}
            >
              <View style={styles.reminderTopRow}>
                <Text
                  style={[
                    styles.reminderTitle,
                    reminder.completed && styles.completedText,
                  ]}
                >
                  {reminder.title}
                </Text>

                <Text
                  style={[
                    styles.status,
                    reminder.completed
                      ? styles.completedStatus
                      : styles.pendingStatus,
                  ]}
                >
                  {reminder.completed ? 'Completed' : 'Upcoming'}
                </Text>
              </View>

              {!!reminder.description && (
                <Text style={styles.reminderDescription}>
                  {reminder.description}
                </Text>
              )}

              <Text style={styles.reminderDate}>
                {formatReminderDate(reminder.reminderDatetime)}
              </Text>

              <View style={styles.reminderActions}>
                <TouchableOpacity
                  onPress={() => toggleReminder(reminder)}
                  style={styles.completeButton}
                >
                  <Text style={styles.completeButtonText}>
                    {reminder.completed ? 'Mark as pending' : 'Mark completed'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => deleteReminder(reminder)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F8F7FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#777184',
    marginTop: 12,
    fontSize: 14,
  },
  content: {
    padding: 22,
    paddingBottom: 45,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 22,
  },
  backButtonText: {
    color: '#7055C8',
    fontSize: 13,
    fontWeight: '600',
  },
  heading: {
    color: '#29243B',
    fontSize: 25,
    fontWeight: '700',
  },
  subtitle: {
    color: '#817B8D',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
    marginBottom: 22,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    borderWidth: 1,
    borderColor: '#ECE9F3',
    marginBottom: 25,
  },
  formHeading: {
    color: '#29243B',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 17,
  },
  label: {
    color: '#494356',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 7,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#FAF9FC',
    borderWidth: 1,
    borderColor: '#E6E1EF',
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 12,
    color: '#29243B',
    fontSize: 14,
  },
  descriptionInput: {
    minHeight: 75,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#7055C8',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 22,
  },
  disabledButton: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  listHeading: {
    color: '#29243B',
    fontSize: 19,
    fontWeight: '700',
  },
  reminderCount: {
    color: '#7055C8',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ECE9F3',
  },
  emptyHeading: {
    color: '#29243B',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptyText: {
    color: '#817B8D',
    fontSize: 13,
    lineHeight: 20,
  },
  reminderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECE9F3',
    marginBottom: 12,
  },
  completedCard: {
    backgroundColor: '#F5F3F8',
  },
  reminderTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  reminderTitle: {
    flex: 1,
    color: '#29243B',
    fontSize: 15,
    fontWeight: '700',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#898393',
  },
  status: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
    overflow: 'hidden',
  },
  pendingStatus: {
    color: '#7055C8',
    backgroundColor: '#F0ECF9',
  },
  completedStatus: {
    color: '#557A65',
    backgroundColor: '#EAF3ED',
  },
  reminderDescription: {
    color: '#817B8D',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 9,
  },
  reminderDate: {
    color: '#7055C8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 12,
  },
  reminderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    gap: 10,
  },
  completeButton: {
    backgroundColor: '#F0ECF9',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 8,
  },
  completeButtonText: {
    color: '#7055C8',
    fontSize: 11,
    fontWeight: '700',
  },
  deleteButton: {
    backgroundColor: '#F8EEEE',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#B44E4E',
    fontSize: 11,
    fontWeight: '700',
  },
});
