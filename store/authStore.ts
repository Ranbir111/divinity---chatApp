import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthStoreInterface {
    isLoggedIn: boolean;
    login: (email: string, password: string, router: any) => Promise<any>;
    signup: (name: string, email: string, password: string, confirmPassword: string, router: any) => Promise<boolean>;
    logout: (router: any) => boolean;
}

export const useAuthStore = create(
    persist((set) => ({
        isLoggedIn: false,
        login: async (email: string, password: string, router: any) => {
            // Handle login logic here
            if (!email || !password) {
                alert('Please fill all the fields!');
                return false;
            }
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok || response.status === 200) {
                const data = await response.json();
                alert('Login successful!');

                set({ isLoggedIn: true });
                AsyncStorage.setItem('loggedIn', 'true');
                AsyncStorage.setItem('user', JSON.stringify(data.user));
                // Navigate to home page or dashboard
                router.replace('/(tabs)/(chats)');
                return data;
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message}`);
                return false;
            }
        },
        signup: async (name: string, email: string, password: string, confirmPassword: string, router: any) => {
            if (!name || !email || !password || !confirmPassword) {
                alert('Please fill all the fields!');
                return false;
            }
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return false;
            }
            if (password.length < 6) {
                alert('Password should be at least 6 characters long!');
                return false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address!');
                return false;
            }

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            ToastAndroid.show('Processing Signup...', ToastAndroid.SHORT);

            if (response.ok || response.status === 200) {
                alert('Signup successful! Please log in.');
                // Navigate to login page or home page
                router.replace('/login');
                return true;
            } else {
                const errorData = await response.json();
                alert(`Signup failed: ${errorData.message}`);
                return false;
            }
        },
        logout: (router: any) => {
            set({ isLoggedIn: false })
            AsyncStorage.removeItem('loggedIn');
            AsyncStorage.removeItem('user');
            ToastAndroid.show('Logged out successfully!', ToastAndroid.SHORT);
            router.replace('/(auth)/login');
            return true;
        }
    }), {
        name: "auth-storage",
        storage: createJSONStorage(() => AsyncStorage)
    })
)