import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { StyleSheet, Text, View } from 'react-native';

export default function Authentication() {
  const router = useRouter();


  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('loggedIn');
      if (loggedIn === 'true') {
        router.replace("/(tabs)/(chats)");
      } else {
        router.replace("/login");
      }
    };
    checkLoginStatus();
  }, [])



  // // Redirect to signup after 1 second
  // setTimeout(() => {
  //   checkLoginStatus();
  // }, 1000);


  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Welcome to Divinity</Text>
      {/* <Text style={styles.text2}>Please login or signup to continue</Text>
      <View style={{ display: 'flex', flexDirection: "row", gap: 20, marginTop: 20 }}>
        <Link style={styles.button} href="/login">Login</Link>
        <Link style={styles.button} href="/signup">signup</Link>
      </View> */}
    </View>
  )
  // return <Redirect href="/(tabs)/(chats)" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
  },
  text1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#256af4ff',
  },
  text2: {
    marginTop: 50,
    fontSize: 15,
    fontWeight: 'light',
  },
  button: {
    fontSize: 18,
    color: '#256af4ff',
    fontWeight: 'bold',
    padding: 10,
    borderWidth: 2,
    borderColor: '#256af4ff',
    borderRadius: 5,
    textAlign: 'center',
    width: 100,
    backgroundColor: '#ffffff',
  }
})