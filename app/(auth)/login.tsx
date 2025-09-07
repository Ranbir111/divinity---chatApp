import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';

export default function Login() {
    return (
        <View style={styles.body}>
            <View style={styles.form}>
                <Text style={styles.heading}>Login</Text>
                <TextInput style={styles.input} keyboardType='email-address' placeholder='Enter your email...' />
                <TextInput secureTextEntry style={styles.input} placeholder='Enter your password...' />
                <View style={{ marginTop: 10 }}>
                    <Link href='/' style={{ color: '#256af4ff', textAlign: 'right', width: '100%', paddingLeft: 'auto' }}>Forgot your password?</Link>
                </View>
                <TouchableOpacity activeOpacity={0.7} accessibilityHint='Login button' style={styles.button} onPress={() => {
                    ToastAndroid.show('Login pressed', ToastAndroid.SHORT)
                }}>
                    <Text style={{ ...styles.input, textAlign: 'center', backgroundColor: '#256af4ff', color: '#fff' }}>Login</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 10, alignItems: 'center' }}>
                    <Text>Don't have an account? <Link href='/signup' style={{ color: '#256af4ff' }}>Sign up</Link></Text>
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