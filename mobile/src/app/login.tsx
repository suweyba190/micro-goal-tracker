
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
import { Link } from 'expo-router';

const API_URL = 'http://10.50.61.74:5000';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing information', 'Enter your email and password.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        Alert.alert(
          'Unable to connect',
          result.error || 'The email or password is incorrect.',
        );
        return;
      }

      Alert.alert(
        'Login successful',
        `Welcome back, ${result.full_name || 'student'}! Your account has been verified.`,
      );
    } catch {
      Alert.alert(
        'Connection error',
        'Could not reach the server. Check your Wi-Fi and make sure the backend is running.',
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
          <Text style={styles.eyebrow}>WELCOME BACK</Text>
          <Text style={styles.heading}>Connect to your account</Text>
          <Text style={styles.description}>
            Enter your account details to continue working towards your
            academic goals.
          </Text>
        </View>

        <View style={styles.form}>
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
            placeholder="Enter your password"
            placeholderTextColor="#A19BAD"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Connect</Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerRow}>
            <Text style={styles.registerText}>
              Don't have an account?{' '}
            </Text>
            <Link href="/register" style={styles.registerLink}>
              Create one
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
    marginBottom: 55,
  },
  headingArea: {
    marginBottom: 35,
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
    marginTop: 20,
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
    marginTop: 32,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 27,
    flexWrap: 'wrap',
  },
  registerText: {
    color: '#777386',
    fontSize: 13,
  },
  registerLink: {
    color: '#6852B8',
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    color: '#9993A5',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 40,
  },
});
