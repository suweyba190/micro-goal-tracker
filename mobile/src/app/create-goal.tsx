
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
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

const API_URL = 'http://10.50.61.74:5000';

export default function CreateGoalScreen() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [loading, setLoading] = useState(false);

  const handleCreateGoal = async () => {
    if (!title.trim() || !subject.trim() || !date.trim()) {
      Alert.alert('Missing information', 'Please complete all fields.');
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date.trim())) {
      Alert.alert(
        'Invalid date',
        'Enter the date in YYYY-MM-DD format, for example 2026-12-15.',
      );
      return;
    }

    try {
      setLoading(true);

      const savedSession = await SecureStore.getItemAsync('studentSession');

      if (!savedSession) {
        Alert.alert('Session expired', 'Please connect to your account again.');
        router.replace('/login');
        return;
      }

      const student = JSON.parse(savedSession);

      const response = await fetch(`${API_URL}/api/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: student.student_id,
          title: title.trim(),
          subject: subject.trim(),
          date: date.trim(),
          priority,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        Alert.alert(
          'Could not create goal',
          result.error || 'Something went wrong. Please try again.',
        );
        return;
      }

      Alert.alert(
        'Goal created',
        'Your academic goal has been saved successfully.',
        [
          {
            text: 'View dashboard',
            onPress: () => router.replace('/dashboard'),
          },
        ],
      );
    } catch {
      Alert.alert(
        'Connection error',
        'Could not reach the server. Check that your backend is running and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>Back to dashboard</Text>
          </TouchableOpacity>

          <View style={styles.headingArea}>
            <Text style={styles.eyebrow}>ACADEMIC PLANNING</Text>
            <Text style={styles.heading}>Create a goal</Text>
            <Text style={styles.description}>
              Set an academic target and break it down into smaller tasks as
              you work towards completing it.
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Goal title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Complete Database Assignment"
              placeholderTextColor="#A19BAD"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />

            <Text style={styles.label}>Subject or course</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Database Systems"
              placeholderTextColor="#A19BAD"
              value={subject}
              onChangeText={setSubject}
              maxLength={100}
            />

            <Text style={styles.label}>Target date</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#A19BAD"
              value={date}
              onChangeText={setDate}
              keyboardType="numbers-and-punctuation"
              maxLength={10}
            />
            <Text style={styles.helperText}>
              Use the format YYYY-MM-DD, for example 2026-12-15.
            </Text>

            <Text style={styles.label}>Priority</Text>
            <View style={styles.priorityContainer}>
              {['Low', 'Medium', 'High'].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.priorityButton,
                    priority === item && styles.prioritySelected,
                  ]}
                  onPress={() => setPriority(item)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      priority === item && styles.priorityTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.submitButton, loading && styles.disabledButton]}
              onPress={handleCreateGoal}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Create academic goal</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  keyboardArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 35,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 35,
  },
  backText: {
    color: '#6852B8',
    fontSize: 14,
    fontWeight: '600',
  },
  headingArea: {
    marginBottom: 30,
  },
  eyebrow: {
    color: '#7663B5',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 12,
  },
  heading: {
    color: '#29243A',
    fontSize: 31,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    color: '#777386',
    fontSize: 14,
    lineHeight: 22,
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEEAF4',
    padding: 19,
  },
  label: {
    color: '#302B40',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 9,
    marginTop: 17,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    borderRadius: 11,
    paddingHorizontal: 13,
    color: '#302B40',
    fontSize: 14,
    backgroundColor: '#FFFFFF',
  },
  helperText: {
    color: '#9993A5',
    fontSize: 11,
    marginTop: 7,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 9,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    alignItems: 'center',
  },
  prioritySelected: {
    backgroundColor: '#6852B8',
    borderColor: '#6852B8',
  },
  priorityText: {
    color: '#777386',
    fontSize: 13,
    fontWeight: '600',
  },
  priorityTextSelected: {
    color: '#FFFFFF',
  },
  submitButton: {
    height: 54,
    backgroundColor: '#6852B8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
