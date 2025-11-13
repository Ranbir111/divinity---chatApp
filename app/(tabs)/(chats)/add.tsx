import { UserStoreInterface, useUserStore } from '@/store/userStore';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Add() {
    const router = useRouter();

    const { addConnection, user } = useUserStore() as UserStoreInterface;

    const [email, setEmail] = useState('');

    const handleAdd = async () => {
        
        await addConnection(user._id, email);

        // if (!email) {
        //     alert("Please fill the required field!");
        // }

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //     alert('Please enter a valid email address!');
        //     return;
        // }

        // const userStr = await AsyncStorage.getItem("user");
        // const senderId = userStr ? JSON.parse(userStr) : null;

        // const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/others/addConnection`, {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ senderId, email })
        // });
        // const data = await response.json();

        // if (response.ok || response.status === 200) {
        //     ToastAndroid.show(data.message, ToastAndroid.SHORT);
        //     AsyncStorage.setItem('user', data.user);
        //     setEmail("");
        //     router.back();
        // } else {
        //     alert(`Login failed: ${data.message}`);
        // }
    }

    return (
        <View style={styles.container}>
            <TextInput value={email} onChangeText={text => setEmail(text)} style={styles.input} placeholder='Enter email...' />
            <Pressable onPress={handleAdd} style={styles.button}>
                <Text style={styles.buttonText}>Add <Entypo name="add-user" /></Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30
    },
    input: {
        borderBottomWidth: 2,
        width: '80%',
        borderColor: '#d9d9d9'
    },
    button: {
        paddingVertical: 10,
        backgroundColor: '#256af4ff',
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        // fontSize: 20
    }
});