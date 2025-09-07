import { Stack } from 'expo-router'
import React from 'react'

export default function ChatsLayout() {
  return (
    <Stack initialRouteName='index'>
        <Stack.Screen name="index" options={{ headerTitle: 'Divinity', headerTitleAlign: 'center', headerStyle:{ backgroundColor: '#256af4ff'}, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold', fontFamily: 'System' } }} />
        <Stack.Screen name="chat" options={{ headerShown: false }} />
    </Stack>
  )
}
