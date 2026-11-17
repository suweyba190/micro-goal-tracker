
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
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://10.50.61.74:5000';

type MicroGoal = {
  id: number;
  goalId: number;
  goalTitle: string;
  title: string;
  description: string;
  completed: boolean;
};

export default function MicroGoalsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    goal_id: string;
    goal_title: string;
  }>();

  const goalId = Number(params.goal_id);
  const goalTitle = params.goal_title || 'Academic goal';

  const [studentId, setStudentId] = useState<number | null>(null);
  const [microGoals, setMicroGoals] = useState<MicroGoal[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadMicroGoals = useCallback(async (id: number) => {
    try {
      const response = await fetch(
        `${API_URL}/api/micro-goals?student_id=${id}`
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Could not load micro-goals.');
      }

      const allMicroGoals: MicroGoal[] = result.micro_goals || [];

      setMicroGoals(
        allMicroGoals.filter((item) => Number(item.goalId) === goalId)
      );
    } catch (error) {
      Alert.alert(
        'Unable to load tasks',
        error instanceof Error ? error.message : 'Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, [goalId]);

  useEffect(() => {
    async function initialise() {
      if (!Number.isFinite(goalId) || goalId <= 0) {
        Alert.alert('Invalid goal', 'Please open this screen from an academic goal.');
        router.back();
        return;
      }

      try {
        const savedSession = await SecureStore.getItemAsync('studentSession');

        if (!savedSession) {
          router.replace('/login');
          return;
        }

        const student = JSON.parse(savedSession);
        setStudentId(Number(student.student_id));
        await loadMicroGoals(Number(student.student_id));
      } catch {
        Alert.alert('Error', 'Could not retrieve your student session.');
        setLoading(false);
      }
    }

    initialise();
  }, [goalId, loadMicroGoals, router]);

  async function createMicroGoal() {
    if (!title.trim()) {
      Alert.alert('Missing task', 'Please enter a task title.');
      return;
    }

    if (!studentId) {
      Alert.alert('Session expired', 'Please connect to your account again.');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`${API_URL}/api/micro-goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: studentId,
          goal_id: goalId,
          title: title.trim(),
          description: description.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Could not create the task.');
      }

      setTitle('');
      setDescription('');
      await loadMicroGoals(studentId);
      Alert.alert('Task added', 'Your micro-goal has been saved.');
    } catch (error) {
      Alert.alert(
        'Could not save task',
        error instanceof Error ? error.message : 'Please try again.'
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleMicroGoal(item: MicroGoal) {
    if (!studentId) return;

    try {
      const response = await fetch(
        `${API_URL}/api/micro-goals/${item.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            student_id: studentId,
            completed: !item.completed,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Could not update the task.');
      }

      await loadMicroGoals(studentId);
    } catch (error) {
      Alert.alert(
        'Update failed',
        error instanceof Error ? error.message : 'Please try again.'
      );
    }
  }

  function deleteMicroGoal(item: MicroGoal) {
    if (!studentId) return;

    Alert.alert(
      'Delete task',
      `Are you sure you want to delete "${item.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                `${API_URL}/api/micro-goals/${item.id}?student_id=${studentId}`,
                { method: 'DELETE' }
              );

              const result = await response.json();

              if (!response.ok) {
                throw new Error(result.message || 'Could not delete the task.');
              }

              await loadMicroGoals(studentId);
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

  const completedCount = microGoals.filter((item) => item.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹  Back to dashboard</Text>
        </Pressable>

        <Text style={styles.eyebrow}>ACADEMIC GOAL</Text>
        <Text style={styles.heading}>Your study tasks</Text>
        <Text style={styles.goalTitle}>{goalTitle}</Text>

        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>TASKS COMPLETED</Text>
          <Text style={styles.progressNumber}>
            {completedCount} of {microGoals.length}
          </Text>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${
                    microGoals.length
                      ? (completedCount / microGoals.length) * 100
                      : 0
                  }%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Add a micro-goal</Text>
          <Text style={styles.inputLabel}>Task title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Read Chapter 3"
            placeholderTextColor="#9993A5"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.inputLabel}>Description (optional)</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Add a few details about this task"
            placeholderTextColor="#9993A5"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Pressable
            style={[styles.addButton, saving && styles.disabledButton]}
            onPress={createMicroGoal}
            disabled={saving}
          >
            <Text style={styles.addButtonText}>
              {saving ? 'Saving...' : 'Add task'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Your tasks</Text>
          <Text style={styles.taskCount}>{microGoals.length} tasks</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#7055C8" />
        ) : microGoals.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No tasks yet</Text>
            <Text style={styles.emptyText}>
              Break this academic goal into smaller tasks by adding your first
              micro-goal above.
            </Text>
          </View>
        ) : (
          microGoals.map((item) => (
            <View key={item.id} style={styles.taskCard}>
              <Pressable
                style={styles.taskMain}
                onPress={() => toggleMicroGoal(item)}
              >
                <View
                  style={[
                    styles.checkbox,
                    item.completed && styles.checkboxCompleted,
                  ]}
                >
                  {item.completed && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>

                <View style={styles.taskTextContainer}>
                  <Text
                    style={[
                      styles.taskTitle,
                      item.completed && styles.completedText,
                    ]}
                  >
                    {item.title}
                  </Text>
                  {!!item.description && (
                    <Text style={styles.taskDescription}>
                      {item.description}
                    </Text>
                  )}
                  <Text style={styles.taskStatus}>
                    {item.completed ? 'Completed' : 'Tap to mark complete'}
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => deleteMicroGoal(item)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
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
    marginBottom: 28,
    alignSelf: 'flex-start',
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
    marginBottom: 7,
  },
  goalTitle: {
    color: '#777184',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 22,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 19,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#ECE9F3',
  },
  progressLabel: {
    color: '#898394',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  progressNumber: {
    color: '#29243B',
    fontSize: 25,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 14,
  },
  progressTrack: {
    height: 7,
    backgroundColor: '#EEEAF6',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: 7,
    backgroundColor: '#8065CE',
    borderRadius: 10,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 19,
    marginBottom: 27,
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
  descriptionInput: {
    minHeight: 75,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#7055C8',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 18,
  },
  disabledButton: {
    opacity: 0.6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },
  taskCount: {
    color: '#827C90',
    fontSize: 13,
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
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 15,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: '#ECE9F3',
  },
  taskMain: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#BDB6CC',
    marginRight: 12,
    marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#7055C8',
    borderColor: '#7055C8',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskTitle: {
    color: '#29243B',
    fontSize: 15,
    fontWeight: '600',
  },
  completedText: {
    color: '#9993A5',
    textDecorationLine: 'line-through',
  },
  taskDescription: {
    color: '#817B8D',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },
  taskStatus: {
    color: '#8A8496',
    fontSize: 11,
    marginTop: 7,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    paddingVertical: 7,
    paddingHorizontal: 4,
    marginTop: 5,
  },
  deleteText: {
    color: '#B34E5B',
    fontSize: 12,
    fontWeight: '600',
  },
});
