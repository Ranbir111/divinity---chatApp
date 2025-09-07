import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Chats() {
  const router = useRouter();
  return (
    <View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchField} placeholder="Search" />
      </View>
      <ScrollView>
        <View style={styles.chatItem} onTouchEnd={() => {
          router.push({ pathname: '/chat', params: { name: 'Ranbir Gupta' } });
        }}>
          <Image source={require('../../../assets/images/user_default.jpg')} style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: '#d9d9d9' }} />
          <View style={styles.chatItemContent}>
            <Text style={{ fontWeight: 'bold' }}>Ranbir Gupta</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'light', color: '#888' }}>Hello</Text>
              <Text style={{ fontWeight: 'light', color: '#888' }}>Just now</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#d9d9d9'
  },
  searchField: {
    backgroundColor: '#d9d9d9',
    paddingVertical: 14,
    paddingLeft: 20,
    borderRadius: 100,
    fontSize: 14
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