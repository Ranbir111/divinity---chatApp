import Entypo from '@expo/vector-icons/Entypo';
import { Tabs, usePathname, useSegments } from 'expo-router';

export default function TabLayout() {
    const segment = useSegments();
    return <Tabs initialRouteName='(chats)' screenOptions={{
        tabBarActiveTintColor: '#256af4ff', tabBarStyle: {
            backgroundColor: '#fff', borderTopColor: '#111',
            display: usePathname().includes('/chat') ? 'none' : 'flex'
        }, tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }
    }}>
        <Tabs.Screen name='(chats)' options={{ headerShown: false, title: 'Chats', tabBarIcon: ({ color }) => <Entypo name='chat' size={24} color={color} /> }} />
        <Tabs.Screen name='(explore)' options={{ headerShown: false, title: 'Explore', tabBarIcon: ({ color }) => <Entypo name='compass' size={24} color={color} /> }} />
        <Tabs.Screen name='(settings)' options={{ headerShown: false, title: 'Settings', tabBarIcon: ({ color }) => <Entypo name='cog' size={24} color={color} /> }} />
    </Tabs>
}