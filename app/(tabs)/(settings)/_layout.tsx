import { Stack } from 'expo-router'
import React from 'react'

export default function SettingsLayout() {
  return (
    <Stack initialRouteName='index'>
        <Stack.Screen name="index" options={{ headerTitle: 'Settings', headerTintColor: '#256af4ff', headerTitleStyle: { fontFamily: 'System' } }} />
    </Stack>
  )
}
