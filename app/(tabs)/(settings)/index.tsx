import { AuthStoreInterface, useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default function Settings() {
  const router = useRouter();

  const { logout } = useAuthStore() as AuthStoreInterface;

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={() => {logout(router)}} />
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