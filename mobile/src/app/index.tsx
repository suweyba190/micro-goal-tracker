
import { StatusBar } from 'expo-status-bar';
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
          <Text style={styles.eyebrow}>BUILD BETTER STUDY HABITS</Text>

          <Text style={styles.heading}>
            Make progress, one goal at a time.
          </Text>

          <Text style={styles.description}>
            Organise your studies into smaller daily goals, stay consistent,
            and keep track of your progress.
          </Text>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardLabel}>YOUR DAILY PROGRESS</Text>
              <Text style={styles.cardTitle}>Keep moving forward</Text>
            </View>

            <View style={styles.progressCircle}>
              <Text style={styles.progressNumber}>45%</Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.progressCaption}>
            Every completed task brings you closer to your goals.
          </Text>
        </View>

        <View style={styles.features}>
          <Text style={styles.sectionTitle}>A simpler way to stay on track</Text>

          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureLetter}>01</Text>
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Set academic goals</Text>
              <Text style={styles.featureDescription}>
                Organise what you want to achieve in each subject.
              </Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureLetter}>02</Text>
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Break work into small tasks</Text>
              <Text style={styles.featureDescription}>
                Turn bigger goals into manageable daily actions.
              </Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureLetter}>03</Text>
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Track your progress</Text>
              <Text style={styles.featureDescription}>
                See your completed work and build consistency.
              </Text>
            </View>
          </View>
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
    paddingHorizontal: 25,
    paddingTop: 22,
    paddingBottom: 35,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: '#6852B8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
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
  },
  hero: {
    marginBottom: 30,
  },
  eyebrow: {
    color: '#7663B5',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  heading: {
    color: '#29243A',
    fontSize: 37,
    lineHeight: 45,
    fontWeight: '700',
    letterSpacing: -1,
    marginBottom: 16,
  },
  description: {
    color: '#777386',
    fontSize: 15,
    lineHeight: 24,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    padding: 21,
    borderRadius: 20,
    marginBottom: 38,
    borderWidth: 1,
    borderColor: '#EFEDF5',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 23,
  },
  cardLabel: {
    fontSize: 10,
    letterSpacing: 1.1,
    color: '#918BA2',
    fontWeight: '700',
    marginBottom: 7,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#302B40',
  },
  progressCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F0ECFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressNumber: {
    color: '#6852B8',
    fontSize: 15,
    fontWeight: '700',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#EEEAF5',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 13,
  },
  progressFill: {
    width: '45%',
    height: '100%',
    backgroundColor: '#7660C3',
    borderRadius: 10,
  },
  progressCaption: {
    color: '#898496',
    fontSize: 12,
    lineHeight: 19,
  },
  features: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#302B40',
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 22,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 21,
  },
  featureIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#EFEBF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  featureLetter: {
    color: '#6852B8',
    fontSize: 13,
    fontWeight: '700',
  },
  featureText: {
    flex: 1,
    paddingTop: 2,
  },
  featureTitle: {
    color: '#302B40',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 5,
  },
  featureDescription: {
    color: '#898496',
    fontSize: 13,
    lineHeight: 20,
  },
  footer: {
    textAlign: 'center',
    color: '#9993A5',
    fontSize: 12,
    marginTop: 5,
  },
});
