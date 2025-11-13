import { AuthStoreInterface, useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
    const router = useRouter();

    const { login } = useAuthStore() as AuthStoreInterface;
    const setUser = useUserStore((state: any) => state.setUser);

    React.useEffect(() => {
        const checkLoggedIn = async () => {
            const loggedIn = await AsyncStorage.getItem('loggedIn');
            if (loggedIn || loggedIn === 'true') {
                router.replace('/(tabs)/(chats)');
            }
        };
        checkLoggedIn();
    }, [router]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const success = await login(email, password, router);
        // if (success) {
        //     setUser(success.user);
        // }

        // // Handle login logic here
        // if (!email || !password) {
        //     alert('Please fill all the fields!');
        //     return;
        // }
        // const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ email, password }),
        // });
        // if (response.ok) {
        //     const data = await response.json();
        //     alert('Login successful!');
        //     AsyncStorage.setItem('loggedIn', 'true');
        //     AsyncStorage.setItem('user', JSON.stringify(data.user));
        //     // Navigate to home page or dashboard
        //     router.replace('/(tabs)/(chats)');
        // } else {
        //     const errorData = await response.json();
        //     alert(`Login failed: ${errorData.message}`);
        // }
    }

    return (
        <View style={styles.body}>
            <View style={styles.form}>
                <Text style={styles.heading}>Login</Text>
                <TextInput value={email} onChangeText={text => setEmail(text)} style={styles.input} keyboardType='email-address' placeholder='Enter your email...' />
                <TextInput value={password} onChangeText={text => setPassword(text)} secureTextEntry style={styles.input} placeholder='Enter your password...' />
                <View style={{ marginTop: 10 }}>
                    <Link href='/' style={{ color: '#256af4ff', textAlign: 'right', width: '100%', paddingLeft: 'auto' }}>Forgot your password?</Link>
                </View>
                <TouchableOpacity activeOpacity={0.7} accessibilityHint='Login button' style={styles.button} onPress={handleLogin}>
                    <Text style={{ ...styles.input, textAlign: 'center', backgroundColor: '#256af4ff', color: '#fff' }}>Login</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 10, alignItems: 'center' }}>
                    <Text>Don't have an account? <Text onPress={() => router.replace('/signup')} style={{ color: '#256af4ff' }}>Sign up</Text></Text>
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
        width: 300,
        borderRadius: 5,
        overflow: 'hidden',
    }
});