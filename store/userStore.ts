import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserStoreInterface {
    user: object | any;
    connections: Array<object>;
    setUser: (userData: object) => void;
    getUser: (id: string) => Promise<void>;
    getConnections: (id: string) => Promise<void>;
    addConnection: (senderId: string, email: string) => Promise<boolean>;
}

export const useUserStore = create(
    persist((set) => ({
        user: {},
        connections: [],
        setUser: (userData: object) => set({ user: userData }),
        getUser: async (id: string) => {
            if (!id) {
                alert("User id not found!");
                return false;
            }
            const response = await fetch(`&{process.env.EXPO_PUBLIC_API_URL}/user/getUser/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok || response.status === 200) {
                const data = await response.json();
                set({ user: data });
                return true;
            } else {
                const errorData = await response.json();
                alert(`Failed to fetch user: ${errorData.message}`);
                return false;
            }
        },
        getConnections: async (id: string) => {
            if (!id) {
                alert("Id not found!");
                return false;
            }
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/getConnections/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok || response.status === 200) {
                const data = await response.json();
                set({ connections: data });
                return true;
            } else {
                const errorData = await response.json();
                alert(`Connections Fetch failed: ${errorData.message}`);
                return false;
            }
        },

        addConnection: async (senderId: string, email: string) => {

            if (!senderId) {
                alert("Sender ID not found!");
                return false;
            }

            if (!email) {
                alert("Please fill the required field!");
                return false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address!');
                return false;
            }

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/addConnection`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ senderId, email })
            });
            if (response.ok || response.status === 200) {
                const data = await response.json();
                alert(data.message);
                set({ connections: data.connections });
                return true;
            } else {
                const errorData = await response.json();
                alert(`Operation Failed: ${errorData.message}`);
                return false;
            }
        }
    }), {
        name: "userData",
        storage: createJSONStorage(() => AsyncStorage),
    }))