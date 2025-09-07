import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Authentication() {
  const router = useRouter();
  // Redirect to login after 1 second
  setTimeout(() => {
    router.replace("/login");
  }, 1000);


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