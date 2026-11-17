
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

type Goal = {
  id: number;
  title: string;
  status: string;
};

type MicroGoal = {
  id: number;
  title: string;
  completed: boolean;
};

type Activity = {
  id: number;
  title: string;
  duration: string;
  durationMinutes: number;
  date: string;
};

type Student = {
  student_id: number;
  full_name: string;
  email: string;
};

export default function ReportsScreen() {
  const router = useRouter();

  const [goals, setGoals] = useState<Goal[]>([]);
  const [microGoals, setMicroGoals] = useState<MicroGoal[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadReports = useCallback(async () => {
    try {
      const savedSession = await SecureStore.getItemAsync('studentSession');

      if (!savedSession) {
        router.replace('/login');
        return;
      }

      const student: Student = JSON.parse(savedSession);

      const [goalsResponse, microGoalsResponse, activitiesResponse] =
        await Promise.all([
          fetch(`${API_URL}/api/goals?student_id=${student.student_id}`),
          fetch(`${API_URL}/api/micro-goals?student_id=${student.student_id}`),
          fetch(`${API_URL}/api/activities?student_id=${student.student_id}`),
        ]);

      const goalsData = await goalsResponse.json();
      const microGoalsData = await microGoalsResponse.json();
      const activitiesData = await activitiesResponse.json();

      if (!goalsResponse.ok) {
        throw new Error(goalsData.message || 'Could not load academic goals.');
      }

      if (!microGoalsResponse.ok) {
        throw new Error(microGoalsData.message || 'Could not load micro-goals.');
      }

      if (!activitiesResponse.ok) {
        throw new Error(activitiesData.message || 'Could not load study activities.');
      }

      setGoals(goalsData.goals || []);
      setMicroGoals(microGoalsData.micro_goals || []);
      setActivities(activitiesData.activities || []);
    } catch (error) {
      Alert.alert(
        'Reports error',
        error instanceof Error ? error.message : 'Please try again.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const completedGoals = goals.filter(
    (goal) => goal.status === 'Completed'
  ).length;

  const completedTasks = microGoals.filter(
    (task) => task.completed
  ).length;

  const goalPercentage = goals.length
    ? Math.round((completedGoals / goals.length) * 100)
    : 0;

  const taskPercentage = microGoals.length
    ? Math.round((completedTasks / microGoals.length) * 100)
    : 0;

  const totalStudyMinutes = activities.reduce(
    (total, activity) => total + Number(activity.durationMinutes || 0),
    0
  );

  const totalHours = Math.floor(totalStudyMinutes / 60);
  const remainingMinutes = totalStudyMinutes % 60;

  const recentActivities = [...activities].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7055C8" />
        <Text style={styles.loadingText}>Preparing your reports...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadReports();
            }}
            tintColor="#7055C8"
          />
        }
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>‹ Back</Text>
          </TouchableOpacity>

          <Text style={styles.brand}>MicroGoal</Text>
          <Text style={styles.heading}>Progress reports</Text>
          <Text style={styles.subtitle}>
            An overview of your academic goals and study activity.
          </Text>
        </View>

        <View style={styles.studyTimeCard}>
          <Text style={styles.cardLabel}>TOTAL STUDY TIME</Text>
          <Text style={styles.studyTime}>
            {totalHours}h {remainingMinutes}m
          </Text>
          <Text style={styles.studyTimeDescription}>
            Recorded study time across all your sessions
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Academic goals</Text>

        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{goals.length}</Text>
            <Text style={styles.summaryLabel}>Total goals</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{completedGoals}</Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {goals.length - completedGoals}
            </Text>
            <Text style={styles.summaryLabel}>Remaining</Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Goal completion</Text>
            <Text style={styles.percentage}>{goalPercentage}%</Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${goalPercentage}%` },
              ]}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Micro-goal progress</Text>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Tasks completed</Text>
            <Text style={styles.percentage}>{taskPercentage}%</Text>
          </View>

          <Text style={styles.taskCount}>
            {completedTasks} of {microGoals.length} tasks completed
          </Text>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${taskPercentage}%` },
              ]}
            />
          </View>

          <Text style={styles.remainingText}>
            {microGoals.length - completedTasks} tasks remaining
          </Text>
        </View>

        <View style={styles.activityHeader}>
          <Text style={styles.sectionTitle}>Study activity</Text>
          <Text style={styles.activityCount}>
            {activities.length} sessions
          </Text>
        </View>

        {recentActivities.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No study sessions yet</Text>
            <Text style={styles.emptyText}>
              Your recorded study sessions will appear here.
            </Text>
          </View>
        ) : (
          recentActivities.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDate}>{activity.date}</Text>
              </View>

              <Text style={styles.duration}>
                {activity.duration}
              </Text>
            </View>
          ))
        )}

        <TouchableOpacity
          style={styles.recordButton}
          onPress={() => router.push('/activity')}
          activeOpacity={0.85}
        >
          <Text style={styles.recordButtonText}>Record study activity</Text>
        </TouchableOpacity>
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
  header: {
    marginBottom: 23,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingRight: 15,
    marginBottom: 16,
  },
  backText: {
    color: '#7055C8',
    fontSize: 14,
    fontWeight: '600',
  },
  brand: {
    color: '#7055C8',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 9,
  },
  heading: {
    color: '#29243B',
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    color: '#817B8D',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
  },
  studyTimeCard: {
    backgroundColor: '#7055C8',
    borderRadius: 16,
    padding: 21,
    marginBottom: 27,
  },
  cardLabel: {
    color: '#E9E2FF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  studyTime: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
    marginTop: 12,
  },
  studyTimeDescription: {
    color: '#E9E2FF',
    fontSize: 12,
    marginTop: 5,
  },
  sectionTitle: {
    color: '#29243B',
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 13,
    marginTop: 8,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 9,
    marginBottom: 13,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    paddingVertical: 17,
    paddingHorizontal: 9,
    borderWidth: 1,
    borderColor: '#ECE9F3',
  },
  summaryNumber: {
    color: '#7055C8',
    fontSize: 25,
    fontWeight: '700',
  },
  summaryLabel: {
    color: '#817B8D',
    fontSize: 11,
    marginTop: 5,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 17,
    marginBottom: 23,
    borderWidth: 1,
    borderColor: '#ECE9F3',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressTitle: {
    color: '#29243B',
    fontSize: 14,
    fontWeight: '600',
  },
  percentage: {
    color: '#7055C8',
    fontSize: 16,
    fontWeight: '700',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#EEEAF6',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 14,
  },
  progressFill: {
    height: 8,
    backgroundColor: '#8065CE',
    borderRadius: 10,
  },
  taskCount: {
    color: '#817B8D',
    fontSize: 12,
    marginTop: 10,
  },
  remainingText: {
    color: '#817B8D',
    fontSize: 11,
    marginTop: 10,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityCount: {
    color: '#817B8D',
    fontSize: 12,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 16,
    marginBottom: 10,
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
    fontSize: 11,
    marginTop: 5,
  },
  duration: {
    color: '#7055C8',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 18,
    borderWidth: 1,
    borderColor: '#ECE9F3',
  },
  emptyTitle: {
    color: '#29243B',
    fontSize: 15,
    fontWeight: '700',
  },
  emptyText: {
    color: '#817B8D',
    fontSize: 12,
    marginTop: 6,
    lineHeight: 19,
  },
  recordButton: {
    backgroundColor: '#F0ECF9',
    borderRadius: 11,
    padding: 15,
    alignItems: 'center',
    marginTop: 17,
  },
  recordButtonText: {
    color: '#7055C8',
    fontSize: 14,
    fontWeight: '700',
  },
});
