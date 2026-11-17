
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
  subject: string;
  date: string;
  priority: string;
  progress?: number;
  status?: string;
};

type MicroGoal = {
  id: number;
  goalId: number;
  goalTitle: string;
  title: string;
  completed: boolean;
};

type Student = {
  student_id: number;
  full_name: string;
  email: string;
};

type Partner = {
  student_id: number;
  full_name: string;
  email: string;
  current_streak: number;
};

type PartnerData = {
  my_streak: number;
  partner: Partner | null;
  message?: string;
};

export default function DashboardScreen() {
  const router = useRouter();

  const [student, setStudent] = useState<Student | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [microGoals, setMicroGoals] = useState<MicroGoal[]>([]);
  const [partnerData, setPartnerData] = useState<PartnerData | null>(null);
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

      const [goalsResponse, microGoalsResponse, partnerResponse] =
        await Promise.all([
          fetch(
            `${API_URL}/api/goals?student_id=${currentStudent.student_id}`
          ),
          fetch(
            `${API_URL}/api/micro-goals?student_id=${currentStudent.student_id}`
          ),
          fetch(
            `${API_URL}/api/partners?student_id=${currentStudent.student_id}`
          ).catch(() => null),
        ]);

      const goalsData = await goalsResponse.json();
      const microGoalsData = await microGoalsResponse.json();

      if (!goalsResponse.ok) {
        throw new Error(
          goalsData.message || 'Could not load academic goals.'
        );
      }

      if (!microGoalsResponse.ok) {
        throw new Error(
          microGoalsData.message || 'Could not load micro-goals.'
        );
      }

      setGoals(goalsData.goals || []);
      setMicroGoals(microGoalsData.micro_goals || []);

      if (partnerResponse && partnerResponse.ok) {
        const partnerResult = await partnerResponse.json();
        setPartnerData(partnerResult);
      } else {
        setPartnerData(null);
      }
    } catch (error) {
      Alert.alert(
        'Dashboard error',
        error instanceof Error ? error.message : 'Please try again.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  async function disconnect() {
    Alert.alert('Disconnect', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: async () => {
          await SecureStore.deleteItemAsync('studentSession');
          router.replace('/login');
        },
      },
    ]);
  }

  const completedTasks = microGoals.filter(
    (item) => item.completed
  ).length;

  const totalTasks = microGoals.length;

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7055C8" />
        <Text style={styles.loadingText}>Loading your dashboard...</Text>
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
              loadDashboard();
            }}
            tintColor="#7055C8"
          />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>MicroGoal</Text>
            <Text style={styles.greeting}>
              Hello, {student?.full_name || 'Student'}
            </Text>
            <Text style={styles.subtitle}>
              Keep making progress, one task at a time.
            </Text>
          </View>

          <TouchableOpacity onPress={disconnect} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>YOUR STUDY PROGRESS</Text>

          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryNumber}>{goals.length}</Text>
              <Text style={styles.summaryDescription}>Academic goals</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View>
              <Text style={styles.summaryNumber}>
                {completedTasks}/{totalTasks}
              </Text>
              <Text style={styles.summaryDescription}>Tasks completed</Text>
            </View>
          </View>
        </View>

        {/* STUDY STREAK SECTION */}
        <View style={styles.streakCard}>
          <Text style={styles.streakHeading}>Study streak</Text>
          <Text style={styles.streakSubtitle}>
            Keep completing micro-goals each day to maintain your streak.
          </Text>

          {partnerData ? (
            <>
              <View style={styles.myStreakContainer}>
                <Text style={styles.streakNumber}>
                  {partnerData.my_streak}
                </Text>
                <Text style={styles.streakDays}>
                  {partnerData.my_streak === 1 ? 'day' : 'days'} in a row
                </Text>
                <Text style={styles.streakLabel}>Your current streak</Text>
              </View>

              <View style={styles.streakDivider} />

              {partnerData.partner ? (
                <View style={styles.partnerContainer}>
                  <View style={styles.partnerTextContainer}>
                    <Text style={styles.partnerHeading}>Study partner</Text>
                    <Text style={styles.partnerName}>
                      {partnerData.partner.full_name}
                    </Text>
                  </View>

                  <View style={styles.partnerStreakContainer}>
                    <Text style={styles.partnerStreakNumber}>
                      {partnerData.partner.current_streak}
                    </Text>
                    <Text style={styles.partnerStreakLabel}>
                      {partnerData.partner.current_streak === 1
                        ? 'day'
                        : 'days'}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.noPartnerContainer}>
                  <Text style={styles.noPartnerHeading}>
                    No study partner connected
                  </Text>
                  <Text style={styles.noPartnerText}>
                    Your personal study streak is still being tracked.
                  </Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.noPartnerContainer}>
              <Text style={styles.noPartnerText}>
                Streak information is currently unavailable. Pull down to refresh.
              </Text>
            </View>
          )}
        </View>

        {/* STUDY ACTIVITY */}
        <View style={styles.activitySection}>
          <View style={styles.activitySectionText}>
            <Text style={styles.activityHeading}>Study activity</Text>
            <Text style={styles.activitySubtitle}>
              Record your study sessions and track your time.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.activityButton}
            onPress={() => router.push('/activity')}
            activeOpacity={0.85}
          >
            <Text style={styles.activityButtonText}>
              Record study activity
            </Text>
          </TouchableOpacity>
        </View>

        {/* PROGRESS REPORTS */}
        <View style={styles.activitySection}>
          <View style={styles.activitySectionText}>
            <Text style={styles.activityHeading}>Progress reports</Text>
            <Text style={styles.activitySubtitle}>
              Review your completed goals and study time.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.activityButton}
            onPress={() => router.push('/reports')}
            activeOpacity={0.85}
          >
            <Text style={styles.activityButtonText}>
              View progress reports
            </Text>
          </TouchableOpacity>
        </View>

        {/* STUDY REMINDERS */}
        <View style={styles.activitySection}>
          <View style={styles.activitySectionText}>
            <Text style={styles.activityHeading}>Study reminders</Text>
            <Text style={styles.activitySubtitle}>
              Schedule study sessions and receive reminders at the right time.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.activityButton}
            onPress={() => router.push('/reminders')}
            activeOpacity={0.85}
          >
            <Text style={styles.activityButtonText}>
              Manage study reminders
            </Text>
          </TouchableOpacity>
        </View>

        {/* ACADEMIC GOALS */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Academic goals</Text>
            <Text style={styles.sectionSubtitle}>
              Select a goal to manage its smaller tasks.
            </Text>
          </View>
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
            <Text style={styles.emptyText}>
              Create your first academic goal to start planning your study tasks.
            </Text>
          </View>
        ) : (
          goals.map((goal) => {
            const goalMicroGoals = microGoals.filter(
              (item) => Number(item.goalId) === Number(goal.id)
            );

            const goalCompleted = goalMicroGoals.filter(
              (item) => item.completed
            ).length;

            return (
              <TouchableOpacity
                key={goal.id}
                style={styles.goalCard}
                activeOpacity={0.85}
                onPress={() =>
                  router.push({
                    pathname: '/micro-goals',
                    params: {
                      goal_id: String(goal.id),
                      goal_title: goal.title,
                    },
                  })
                }
              >
                <View style={styles.goalTopRow}>
                  <View style={styles.goalTitleContainer}>
                    <Text style={styles.goalTitle}>{goal.title}</Text>
                    <Text style={styles.goalSubject}>{goal.subject}</Text>
                  </View>

                  <Text style={styles.priority}>{goal.priority}</Text>
                </View>

                <View style={styles.goalBottomRow}>
                  <Text style={styles.goalDate}>Target: {goal.date}</Text>
                  <Text style={styles.taskProgress}>
                    {goalCompleted}/{goalMicroGoals.length} tasks
                  </Text>
                </View>

                <View style={styles.goalProgressTrack}>
                  <View
                    style={[
                      styles.goalProgressFill,
                      {
                        width: `${
                          goalMicroGoals.length
                            ? (goalCompleted / goalMicroGoals.length) * 100
                            : 0
                        }%`,
                      },
                    ]}
                  />
                </View>

                <Text style={styles.openGoalText}>
                  Open goal and manage tasks →
                </Text>
              </TouchableOpacity>
            );
          })
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  brand: {
    color: '#7055C8',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 13,
  },
  greeting: {
    color: '#252238',
    fontSize: 25,
    fontWeight: '700',
  },
  subtitle: {
    color: '#817B8D',
    fontSize: 13,
    marginTop: 6,
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 9,
    backgroundColor: '#EFECF5',
  },
  logoutText: {
    color: '#7055C8',
    fontWeight: '600',
    fontSize: 12,
  },
  summaryCard: {
    backgroundColor: '#7055C8',
    borderRadius: 17,
    padding: 21,
    marginBottom: 22,
  },
  summaryLabel: {
    color: '#E9E2FF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 19,
  },
  summaryNumber: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: '700',
  },
  summaryDescription: {
    color: '#E9E2FF',
    fontSize: 12,
    marginTop: 3,
  },
  summaryDivider: {
    width: 1,
    height: 45,
    backgroundColor: '#A99AD8',
    marginHorizontal: 35,
  },
  streakCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#ECE9F3',
  },
  streakHeading: {
    color: '#29243B',
    fontSize: 18,
    fontWeight: '700',
  },
  streakSubtitle: {
    color: '#817B8D',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 5,
  },
  myStreakContainer: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  streakNumber: {
    color: '#7055C8',
    fontSize: 43,
    fontWeight: '700',
  },
  streakDays: {
    color: '#29243B',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  streakLabel: {
    color: '#817B8D',
    fontSize: 12,
    marginTop: 5,
  },
  streakDivider: {
    height: 1,
    backgroundColor: '#ECE9F3',
    marginVertical: 5,
  },
  partnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 14,
  },
  partnerTextContainer: {
    flex: 1,
  },
  partnerHeading: {
    color: '#817B8D',
    fontSize: 11,
    marginBottom: 5,
  },
  partnerName: {
    color: '#29243B',
    fontSize: 14,
    fontWeight: '700',
  },
  partnerStreakContainer: {
    alignItems: 'center',
    backgroundColor: '#F0ECF9',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  partnerStreakNumber: {
    color: '#7055C8',
    fontSize: 21,
    fontWeight: '700',
  },
  partnerStreakLabel: {
    color: '#817B8D',
    fontSize: 10,
  },
  noPartnerContainer: {
    paddingTop: 16,
  },
  noPartnerHeading: {
    color: '#29243B',
    fontSize: 13,
    fontWeight: '600',
  },
  noPartnerText: {
    color: '#817B8D',
    fontSize: 12,
    lineHeight: 19,
  },
  activitySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 17,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#ECE9F3',
  },
  activitySectionText: {
    marginBottom: 14,
  },
  activityHeading: {
    color: '#29243B',
    fontSize: 17,
    fontWeight: '700',
  },
  activitySubtitle: {
    color: '#817B8D',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 5,
  },
  activityButton: {
    backgroundColor: '#F0ECF9',
    borderRadius: 10,
    padding: 13,
    alignItems: 'center',
  },
  activityButtonText: {
    color: '#7055C8',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionHeader: {
    marginTop: 9,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#29243B',
    fontSize: 20,
    fontWeight: '700',
  },
  sectionSubtitle: {
    color: '#817B8D',
    fontSize: 12,
    marginTop: 5,
  },
  createButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCD4EF',
    borderRadius: 11,
    padding: 15,
    alignItems: 'center',
    marginBottom: 16,
  },
  createButtonText: {
    color: '#7055C8',
    fontSize: 14,
    fontWeight: '700',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 21,
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
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 17,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#ECE9F3',
  },
  goalTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  goalTitleContainer: {
    flex: 1,
    paddingRight: 10,
  },
  goalTitle: {
    color: '#29243B',
    fontSize: 16,
    fontWeight: '700',
  },
  goalSubject: {
    color: '#817B8D',
    fontSize: 12,
    marginTop: 5,
  },
  priority: {
    color: '#7055C8',
    fontSize: 11,
    fontWeight: '700',
    backgroundColor: '#F0ECF9',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
  },
  goalBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 17,
  },
  goalDate: {
    color: '#817B8D',
    fontSize: 11,
  },
  taskProgress: {
    color: '#7055C8',
    fontSize: 11,
    fontWeight: '700',
  },
  goalProgressTrack: {
    height: 6,
    backgroundColor: '#EEEAF5',
    borderRadius: 5,
    marginTop: 12,
    overflow: 'hidden',
  },
  goalProgressFill: {
    height: '100%',
    backgroundColor: '#8067D1',
    borderRadius: 5,
  },
  openGoalText: {
    color: '#817B8D',
    fontSize: 11,
    marginTop: 13,
  },
});
