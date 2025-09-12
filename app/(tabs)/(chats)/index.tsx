import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { io, Socket } from 'socket.io-client';

export default function Chats() {
  const [userId, setUserId] = useState<any>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  
  useEffect(() => {
    const getUser = async () => {
      const userStr = await AsyncStorage.getItem('user');
      if (userStr) {
        setUserId((JSON.parse(userStr))._id);
      }
    };
    getUser();


    const newSocket = io(process.env.EXPO_PUBLIC_SOCKET_URL, { auth: { userId } });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  type Connection = {
    _id: string;
    username: string;
    profilePic: string;
  };

  const [connections, setConnections] = useState<Connection[]>([]);

  const getConnections = async () => {
    try {
      setIsLoading(true);
      const user = await AsyncStorage.getItem('user');
      if (!user) return;

      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/getConnections/${(JSON.parse(user)._id)}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();

      if (response.ok || response.status === 200) {
        setConnections(data);
      }
    } catch (error) {
      console.error('Error fetching connections:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const getUser = async (id: string) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/getUser/${id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (response.ok || response.status === 200) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    getConnections();
  }, [])

  return (
    <View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchField} placeholder="Search" />
        <Pressable onPress={() => {
          // ToastAndroid.show('Add new chat', ToastAndroid.SHORT);
          router.navigate('/add');
        }}
          style={{ padding: 15, backgroundColor: '#d9d9d9', borderRadius: 25 }}>
          <Entypo name="add-user" size={20} color="white" />
          {/* <Text style={{ fontSize: 20, color: '#d9d9d9', padding:10, borderWidth:2, borderColor: '#d9d9d9', borderRadius: 25 }}>+</Text> */}
        </Pressable>
      </View>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator size="large" color="#256af4" style={{ marginTop: 20 }} />
        ) : connections.length !== 0 ? (
          connections?.map((connection, key) => {
            return (
              <View key={key} style={styles.chatItem} onTouchEnd={() => {
                router.push({ pathname: '/chat', params: { id: connection._id, name: connection.username } });
              }}>
                <Image source={require('../../../assets/images/user_default.jpg')} style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: '#d9d9d9' }} />
                <View style={styles.chatItemContent}>
                  <Text style={{ fontWeight: 'bold' }}>{connection.username}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'light', color: '#d9d9d9' }}>Hello</Text>
                    <Text style={{ fontWeight: 'light', color: '#d9d9d9' }}>Just now</Text>
                  </View>
                </View>
              </View>
            )
          })
        ) : (<Text>No connections!</Text>)}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#d9d9d9',
    gap: 10
  },
  searchField: {
    backgroundColor: '#d9d9d9',
    paddingVertical: 14,
    paddingLeft: 20,
    borderRadius: 100,
    fontSize: 14,
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    // backgroundColor: '#fff',
    // borderBottomWidth: 1,
    // borderColor: '#d9d9d9'
  },
  chatItemContent: {
    marginLeft: 12,
    // backgroundColor: '#1111',
    flex: 1,
    justifyContent: 'space-between'
  }
});