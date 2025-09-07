import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Chat() {
    const { name } = useLocalSearchParams();
    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <View style={styles.header}></View>
            <View style={styles.container}>
                <View style={styles.chatHeader}>
                    <View style={styles.userContainer}>
                        <Image source={require('../../../assets/images/user_default.jpg')} style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: '#d9d9d9' }} />
                        <View style={styles.userContent}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{name}</Text>
                            <Text style={{ fontWeight: 'normal', color: '#555' }}>Online</Text>
                        </View>
                    </View>
                    <View style={styles.featuresContainer}>
                        <Pressable style={{ ...styles.optionsButton, backgroundColor: '#fff', padding: 5, borderRadius: 25 }} onPress={() => { alert('Call clicked') }}>
                            <Ionicons name="call" size={24} color="#555" />
                        </Pressable>
                        <Pressable style={{ ...styles.optionsButton, backgroundColor: '#fff', padding: 5, borderRadius: 25 }} onPress={() => { alert('Video Call clicked') }}>
                            <Ionicons name="videocam" size={24} color="#555" />
                        </Pressable>
                        <Pressable style={styles.optionsButton} onPress={() => { alert('Options clicked') }}>
                            <Text style={{ fontSize: 24, color: '#555', padding: 10 }}>⋮</Text>
                        </Pressable>
                    </View>
                </View>
                <ScrollView style={styles.chatContainer}>
                    <Text style={{ color: '#888', textAlign: 'center', marginVertical: 10 }}>Today</Text>
                    <View style={{ alignSelf: 'flex-start', backgroundColor: '#eee', padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: '70%' }}>
                        <Text>Hello👋! How are you?</Text>
                    </View>
                    <View style={{ alignSelf: 'flex-end', backgroundColor: '#256af4ff', padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: '70%' }}>
                        <Text style={{ color: '#fff' }}>I'm good, thanks! How about you?</Text>
                    </View>
                </ScrollView>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type your message..."
                    />
                    <Pressable style={{ ...styles.optionsButton, backgroundColor: '#fff', padding: 10, borderRadius: 25 }} onPress={() => { alert('Send clicked') }}>
                        <Ionicons name="send" color="#256af4ff" size={24} />
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingBottom: 20
    },
    header: {
        height: 50,
        backgroundColor: '#256af4ff',
    },
    userContainer: {
        padding: 10,
        backgroundColor: '#d9d9d9',
        flexDirection: 'row',
    },
    userContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    inputContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        // paddingBottom: 20,
        // backgroundColor: '#d9d9d9'
    },
    input: {
        // borderColor: '#ccc',
        // borderWidth: 1,
        borderRadius: 25,
        padding: 10,
        flex: 1,
        backgroundColor: '#fff',
        fontSize: 16
    },
    chatHeader: {
        backgroundColor: '#d9d9d9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    featuresContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingRight: 10
    },
    optionsButton: {
        marginRight: 10,
    }
});