
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
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
          <Text style={styles.eyebrow}>STUDY WITH PURPOSE</Text>
          <Text style={styles.heading}>
            Make every study session count.
          </Text>
          <Text style={styles.description}>
            Turn your academic goals into manageable daily tasks and build
            better study habits, one step at a time.
          </Text>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <View style={styles.progressText}>
              <Text style={styles.cardLabel}>YOUR PROGRESS</Text>
              <Text style={styles.cardTitle}>Small steps add up.</Text>
            </View>
            <View style={styles.progressCircle}>
              <Text style={styles.progressNumber}>45%</Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressCaption}>
            Stay consistent and keep moving towards your goals.
          </Text>
        </View>

        <View style={styles.features}>
          <Text style={styles.sectionTitle}>Everything starts with a plan</Text>

          <View style={styles.featureRow}>
            <View style={styles.featureNumber}>
              <Text style={styles.numberText}>01</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Set academic goals</Text>
              <Text style={styles.featureDescription}>
                Plan what you want to achieve in each subject.
              </Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureNumber}>
              <Text style={styles.numberText}>02</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Create daily micro-goals</Text>
              <Text style={styles.featureDescription}>
                Break bigger tasks into smaller actions.
              </Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureNumber}>
              <Text style={styles.numberText}>03</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Monitor your progress</Text>
              <Text style={styles.featureDescription}>
                Review your work and build consistent habits.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <Link href="/register" style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Create an account</Text>
          </Link>

          <Link href="/login" style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>
              Already have an account? Connect
            </Text>
          </Link>
        </View>

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
  container: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 18,
    paddingBottom: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#6852B8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
  },
  brand: {
    fontSize: 19,
    fontWeight: '700',
    color: '#29243A',
    letterSpacing: -0.3,
  },
  hero: {
    marginBottom: 23,
  },
  eyebrow: {
    color: '#7663B5',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  heading: {
    color: '#29243A',
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700',
    letterSpacing: -0.8,
    marginBottom: 11,
  },
  description: {
    color: '#777386',
    fontSize: 14,
    lineHeight: 21,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 17,
    marginBottom: 27,
    borderWidth: 1,
    borderColor: '#EFEDF5',
  },
  progressTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  progressText: {
    flex: 1,
    paddingRight: 10,
  },
  cardLabel: {
    fontSize: 10,
    letterSpacing: 1.1,
    color: '#918BA2',
    fontWeight: '700',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#302B40',
  },
  progressCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0ECFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressNumber: {
    color: '#6852B8',
    fontSize: 14,
    fontWeight: '700',
  },
  progressTrack: {
    height: 7,
    backgroundColor: '#EEEAF5',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    width: '45%',
    height: '100%',
    backgroundColor: '#7660C3',
    borderRadius: 10,
  },
  progressCaption: {
    color: '#898496',
    fontSize: 11,
    lineHeight: 17,
  },
  features: {
    marginBottom: 23,
  },
  sectionTitle: {
    color: '#302B40',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  featureNumber: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#EFEBF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  numberText: {
    color: '#6852B8',
    fontSize: 11,
    fontWeight: '700',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    color: '#302B40',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 3,
  },
  featureDescription: {
    color: '#898496',
    fontSize: 12,
    lineHeight: 17,
  },
  actions: {
    gap: 10,
    marginTop: 1,
  },
  primaryButton: {
    backgroundColor: '#6852B8',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DED8EC',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#6852B8',
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    color: '#9993A5',
    fontSize: 11,
    marginTop: 19,
  },
});
