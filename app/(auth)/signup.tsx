import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';

export default function Signup() {
  const router = useRouter();

  React.useEffect(() => {
    const checkLoggedIn = async () => {
      const loggedIn = await AsyncStorage.getItem('loggedIn');
      if (loggedIn || loggedIn === 'true') {
        router.replace('/(tabs)/(chats)');
      }
    };
    checkLoggedIn();
  }, [router]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    // ToastAndroid.show('Signup functionality is not implemented yet.', ToastAndroid.SHORT);
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill all the fields!');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (password.length < 6) {
      alert('Password should be at least 6 characters long!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address!');
      return;
    }

    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    ToastAndroid.show('Processing Signup...', ToastAndroid.SHORT);

    if (response.ok) {
      alert('Signup successful! Please log in.');
      // Navigate to login page or home page
      router.replace('/login');
    } else {
      const errorData = await response.json();
      alert(`Signup failed: ${errorData.message}`);
    }
  }

  return (
    <View style={styles.body}>
      <View style={styles.form}>
        <Text style={styles.heading}>Signup</Text>
        <TextInput value={name} onChangeText={text => setName(text)} style={styles.input} placeholder='Enter your full name...' />
        <TextInput value={email} onChangeText={text => setEmail(text)} style={styles.input} keyboardType='email-address' placeholder='Enter your email...' />
        <TextInput value={password} onChangeText={text => setPassword(text)} secureTextEntry style={styles.input} placeholder='Enter your password...' />
        <TextInput value={confirmPassword} onChangeText={text => setConfirmPassword(text)} secureTextEntry style={styles.input} placeholder='Confirm your password...' />
        <TouchableOpacity activeOpacity={0.7} accessibilityHint='Login button' style={styles.button} onPress={handleSignup}>
          <Text style={{ ...styles.input, textAlign: 'center', backgroundColor: '#256af4ff', color: '#fff' }}>Signup</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <Text>Already have an account? <Text onPress={() => router.replace('/login')} style={{ color: '#256af4ff' }}>Log in</Text></Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#256af4ff',
    marginBottom: 20
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#1111',
    borderRadius: 5,
    padding: 10,
    width: 300,
    fontSize: 16,
    backgroundColor: '#ffffff'
  },
  button: {
    marginTop: 10,
    width: 300,
    borderRadius: 5,
    overflow: 'hidden',
  }
});