
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Link, router } from 'expo-router';

const API_URL = 'http://10.50.61.74:5000';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Missing information', 'Please complete all the fields.');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        'Password too short',
        'Your password must contain at least 8 characters.',
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Passwords do not match',
        'Please check your passwords and try again.',
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        Alert.alert(
          'Registration unsuccessful',
          result.error || 'Something went wrong. Please try again.',
        );
        return;
      }

      Alert.alert(
        'Account created',
        'Your account has been created successfully. You can now connect.',
        [
          {
            text: 'Continue',
            onPress: () => router.replace('/login'),
          },
        ],
      );

      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch {
      Alert.alert(
        'Connection error',
        'Could not reach the server. Check that your computer and phone are connected to the same Wi-Fi and that the backend is running.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Link href="/" style={styles.backLink}>
          Back to welcome
        </Link>

        <View style={styles.headingArea}>
          <Text style={styles.eyebrow}>GET STARTED</Text>
          <Text style={styles.heading}>Create your account</Text>
          <Text style={styles.description}>
            Set up your account to start organising your academic goals.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#A19BAD"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor="#A19BAD"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create a password"
            placeholderTextColor="#A19BAD"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={styles.label}>Confirm password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password again"
            placeholderTextColor="#A19BAD"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Create account</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
            </Text>
            <Link href="/login" style={styles.loginLink}>
              Connect
            </Link>
          </View>
        </View>

        <Text style={styles.footer}>
          Small steps. Consistent progress.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingTop: 25,
    paddingBottom: 35,
  },
  backLink: {
    color: '#7663B5',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 45,
  },
  headingArea: {
    marginBottom: 30,
  },
  eyebrow: {
    color: '#7663B5',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 13,
  },
  heading: {
    color: '#29243A',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    color: '#777386',
    fontSize: 15,
    lineHeight: 23,
  },
  form: {
    width: '100%',
  },
  label: {
    color: '#302B40',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 9,
    marginTop: 17,
  },
  input: {
    height: 54,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E4EF',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#302B40',
  },
  button: {
    height: 55,
    backgroundColor: '#6852B8',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    flexWrap: 'wrap',
  },
  loginText: {
    color: '#777386',
    fontSize: 13,
  },
  loginLink: {
    color: '#6852B8',
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    color: '#9993A5',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 35,
  },
});
