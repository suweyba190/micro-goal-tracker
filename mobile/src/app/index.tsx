
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>M</Text>
          </View>
          <Text style={styles.brand}>MicroGoal</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>A BETTER WAY TO STUDY</Text>

          <Text style={styles.heading}>
            Big goals.{'\n'}
            Smaller steps.
          </Text>

          <Text style={styles.description}>
            Organise your academic work into manageable daily tasks and
            build study habits that last.
          </Text>
        </View>

        <View style={styles.previewCard}>
          <View style={styles.previewHeader}>
            <View>
              <Text style={styles.previewLabel}>YOUR STUDY PLAN</Text>
              <Text style={styles.previewTitle}>One goal at a time</Text>
            </View>

            <View style={styles.subjectTag}>
              <Text style={styles.subjectText}>EXAMPLE</Text>
            </View>
          </View>

          <View style={styles.goalBox}>
            <Text style={styles.goalLabel}>ACADEMIC GOAL</Text>
            <Text style={styles.goalTitle}>
              Prepare for Database Systems
            </Text>
          </View>

          <Text style={styles.tasksLabel}>BREAK IT INTO SMALL TASKS</Text>

          <View style={styles.taskRow}>
            <View style={styles.taskCircle} />
            <Text style={styles.taskText}>Review lecture notes</Text>
          </View>

          <View style={styles.taskRow}>
            <View style={styles.taskCircle} />
            <Text style={styles.taskText}>Practise SQL queries</Text>
          </View>

          <View style={styles.taskRow}>
            <View style={styles.taskCircle} />
            <Text style={styles.taskText}>Summarise key concepts</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Link href="/register" asChild>
            <Pressable
              style={styles.primaryButton}
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>
                Create an account
              </Text>
            </Pressable>
          </Link>

          <Link href="/login" asChild>
            <Pressable
              style={styles.secondaryButton}
              accessibilityRole="button"
            >
              <Text style={styles.secondaryButtonText}>
                I already have an account
              </Text>
            </Pressable>
          </Link>
        </View>

        <Text style={styles.footer}>
          Plan your work. Take one step at a time.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F6FB',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 18,
    paddingBottom: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 43,
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#6852B8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  brand: {
    color: '#29243A',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  hero: {
    marginBottom: 29,
  },
  eyebrow: {
    color: '#7561B5',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.8,
    marginBottom: 15,
  },
  heading: {
    color: '#29243A',
    fontSize: 39,
    lineHeight: 46,
    fontWeight: '800',
    letterSpacing: -1.4,
    marginBottom: 15,
  },
  description: {
    color: '#777386',
    fontSize: 15,
    lineHeight: 23,
    maxWidth: 330,
  },
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EBE7F2',
    marginBottom: 29,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 19,
  },
  previewLabel: {
    color: '#9189A3',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.3,
    marginBottom: 5,
  },
  previewTitle: {
    color: '#302B40',
    fontSize: 17,
    fontWeight: '700',
  },
  subjectTag: {
    backgroundColor: '#F0ECFA',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },
  subjectText: {
    color: '#6852B8',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.7,
  },
  goalBox: {
    backgroundColor: '#F7F5FC',
    borderRadius: 12,
    padding: 14,
    marginBottom: 19,
  },
  goalLabel: {
    color: '#8C83A3',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.1,
    marginBottom: 7,
  },
  goalTitle: {
    color: '#302B40',
    fontSize: 15,
    fontWeight: '700',
  },
  tasksLabel: {
    color: '#9189A3',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.1,
    marginBottom: 13,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
  },
  taskCircle: {
    width: 17,
    height: 17,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#C9C1DA',
    marginRight: 12,
  },
  taskText: {
    color: '#514B61',
    fontSize: 13,
    fontWeight: '500',
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    minHeight: 55,
    backgroundColor: '#6852B8',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    minHeight: 53,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DED8EC',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  secondaryButtonText: {
    color: '#6852B8',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    color: '#9690A3',
    textAlign: 'center',
    fontSize: 11,
    marginTop: 20,
  },
});
