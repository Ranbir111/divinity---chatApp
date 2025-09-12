import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default function Settings() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={async () => {
        await AsyncStorage.removeItem('loggedIn');
        await AsyncStorage.removeItem('user');
        router.replace('/(auth)/login');
        alert('Logged out');
      }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});