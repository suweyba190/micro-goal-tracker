
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://10.50.61.74:5000';

type Student = {
  student_id: number;
  full_name: string;
  email: string;
};

type Goal = {
  id: number;
  title: string;
  subject: string;
  date: string;
  priority: string;
  progress: number;
  status: string;
};

type MicroGoal = {
  id: number;
  goalId: number;
  goalTitle: string;
  title: string;
  completed: boolean | number;
};

export default function DashboardScreen() {
  const router = useRouter();

  const [student, setStudent] = useState<Student | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [microGoals, setMicroGoals] = useState<MicroGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboard = useCallback(async () => {
    try {
      const savedSession = await SecureStore.getItemAsync('studentSession');

      if (!savedSession) {
        router.replace('/login');
        return;
      }

      const currentStudent: Student = JSON.parse(savedSession);
      setStudent(currentStudent);

      const [goalsResponse, microGoalsResponse] = await Promise.all([
        fetch(
          `${API_URL}/api/goals?student_id=${currentStudent.student_id}`,
        ),
        fetch(
          `${API_URL}/api/micro-goals?student_id=${currentStudent.student_id}`,
        ),
      ]);

      if (!goalsResponse.ok || !microGoalsResponse.ok) {
        throw new Error('Could not load your study information.');
      }

      const goalsData = await goalsResponse.json();
      const microGoalsData = await microGoalsResponse.json();

      setGoals(goalsData.goals || []);
      setMicroGoals(microGoalsData.micro_goals || []);
    } catch (error) {
      Alert.alert(
        'Dashboard error',
        error instanceof Error
          ? error.message
          : 'Something went wrong while loading your dashboard.',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboard();
  };

  const handleDisconnect = async () => {
    await SecureStore.deleteItemAsync('studentSession');
    router.replace('/');
  };

  const completedMicroGoals = microGoals.filter(
    (item) => item.completed === true || item.completed === 1,
  ).length;

  const progressPercentage =
    microGoals.length > 0
      ? Math.round((completedMicroGoals / microGoals.length) * 100)
      : 0;

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6852B8" />
        <Text style={styles.loadingText}>Loading your dashboard...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6852B8"
          />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>MICROGOAL</Text>
            <Text style={styles.headerSubtitle}>STUDENT DASHBOARD</Text>
          </View>

          <TouchableOpacity onPress={handleDisconnect}>
            <Text style={styles.disconnect}>Disconnect</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.studentName}>
            {student?.full_name || 'Student'}
          </Text>
          <Text style={styles.welcomeDescription}>
            Keep making progress, one small goal at a time.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Your overview</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{goals.length}</Text>
            <Text style={styles.statLabel}>Academic goals</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {completedMicroGoals}/{microGoals.length}
            </Text>
            <Text style={styles.statLabel}>Tasks completed</Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeading}>
            <View>
              <Text style={styles.progressTitle}>Micro-goal progress</Text>
              <Text style={styles.progressSubtitle}>
                Your overall task completion
              </Text>
            </View>

            <Text style={styles.progressPercentage}>
              {progressPercentage}%
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressPercentage}%` },
              ]}
            />
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Academic goals</Text>
          <Text style={styles.itemCount}>{goals.length} total</Text>
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push('/create-goal')}
          activeOpacity={0.85}
        >
          <Text style={styles.createButtonText}>+ Create academic goal</Text>
        </TouchableOpacity>

        {goals.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No academic goals yet</Text>
            <Text style={styles.emptyDescription}>
              Create your first academic goal to start planning your studies.
            </Text>
          </View>
        ) : (
          goals.map((goal) => (
            <View key={goal.id} style={styles.goalCard}>
              <View style={styles.goalTopRow}>
                <Text style={styles.goalSubject}>{goal.subject}</Text>
                <Text style={styles.goalPriority}>{goal.priority}</Text>
              </View>

              <Text style={styles.goalTitle}>{goal.title}</Text>

              <Text style={styles.goalDate}>
                Target date: {goal.date}
              </Text>

              <View style={styles.goalProgressRow}>
                <Text style={styles.goalProgressLabel}>Progress</Text>
                <Text style={styles.goalProgressValue}>
                  {goal.progress || 0}%
                </Text>
              </View>

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.min(
                        100,
                        Math.max(0, Number(goal.progress) || 0),
                      )}%`,
                    },
                  ]}
                />
              </View>
            </View>
          ))
        )}

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Recent micro-goals</Text>
          <Text style={styles.itemCount}>{microGoals.length} total</Text>
        </View>

        {microGoals.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No micro-goals yet</Text>
            <Text style={styles.emptyDescription}>
              Smaller study tasks linked to your academic goals will appear here.
            </Text>
          </View>
        ) : (
          microGoals.slice(0, 5).map((item) => {
            const isCompleted =
              item.completed === true || item.completed === 1;

            return (
              <View key={item.id} style={styles.taskRow}>
                <View
                  style={[
                    styles.taskIndicator,
                    isCompleted && styles.taskCompleted,
                  ]}
                />
                <View style={styles.taskInformation}>
                  <Text
                    style={[
                      styles.taskTitle,
                      isCompleted && styles.completedTaskTitle,
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.taskParent}>
                    {item.goalTitle || 'Academic goal'}
                  </Text>
                </View>
                <Text style={styles.taskStatus}>
                  {isCompleted ? 'Completed' : 'Pending'}
                </Text>
              </View>
            );
          })
        )}

        <Text style={styles.footer}>
          Small steps. Consistent progress.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
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
    marginTop: 14,
    color: '#777386',
    fontSize: 14,
  },
  container: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 35,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
  },
  brand: {
    color: '#6852B8',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  headerSubtitle: {
    color: '#9993A5',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginTop: 4,
  },
  disconnect: {
    color: '#6852B8',
    fontSize: 13,
    fontWeight: '600',
  },
  welcomeSection: {
    marginBottom: 30,
  },
  greeting: {
    color: '#777386',
    fontSize: 16,
  },
  studentName: {
    color: '#29243A',
    fontSize: 29,
    fontWeight: '700',
    marginTop: 4,
  },
  welcomeDescription: {
    color: '#777386',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 9,
  },
  sectionTitle: {
    color: '#302B40',
    fontSize: 18,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 15,
    marginBottom: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EEEAF4',
    padding: 19,
  },
  statNumber: {
    color: '#6852B8',
    fontSize: 27,
    fontWeight: '700',
  },
  statLabel: {
    color: '#777386',
    fontSize: 12,
    marginTop: 6,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EEEAF4',
    padding: 18,
    marginBottom: 30,
  },
  progressHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    color: '#302B40',
    fontSize: 14,
    fontWeight: '700',
  },
  progressSubtitle: {
    color: '#9993A5',
    fontSize: 11,
    marginTop: 5,
  },
  progressPercentage: {
    color: '#6852B8',
    fontSize: 21,
    fontWeight: '700',
  },
  progressBackground: {
    height: 7,
    backgroundColor: '#EEEAF5',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#806BC7',
    borderRadius: 10,
  },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 5,
  },
  itemCount: {
    color: '#9993A5',
    fontSize: 12,
  },
  createButton: {
    height: 50,
    backgroundColor: '#6852B8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EEEAF4',
    padding: 17,
    marginBottom: 12,
  },
  goalTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalSubject: {
    color: '#6852B8',
    fontSize: 11,
    fontWeight: '700',
  },
  goalPriority: {
    color: '#777386',
    fontSize: 11,
  },
  goalTitle: {
    color: '#302B40',
    fontSize: 16,
    fontWeight: '700',
  },
  goalDate: {
    color: '#9993A5',
    fontSize: 11,
    marginTop: 7,
    marginBottom: 16,
  },
  goalProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  goalProgressLabel: {
    color: '#777386',
    fontSize: 11,
  },
  goalProgressValue: {
    color: '#6852B8',
    fontSize: 11,
    fontWeight: '700',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EEEAF4',
    padding: 20,
    marginBottom: 25,
  },
  emptyTitle: {
    color: '#302B40',
    fontSize: 14,
    fontWeight: '700',
  },
  emptyDescription: {
    color: '#9993A5',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 7,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#EEEAF4',
    padding: 14,
    marginBottom: 9,
  },
  taskIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D8D1E9',
    marginRight: 12,
  },
  taskCompleted: {
    backgroundColor: '#6D9B80',
  },
  taskInformation: {
    flex: 1,
  },
  taskTitle: {
    color: '#302B40',
    fontSize: 13,
    fontWeight: '600',
  },
  completedTaskTitle: {
    color: '#9993A5',
  },
  taskParent: {
    color: '#9993A5',
    fontSize: 11,
    marginTop: 4,
  },
  taskStatus: {
    color: '#777386',
    fontSize: 10,
    marginLeft: 8,
  },
  footer: {
    color: '#9993A5',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 30,
  },
});
