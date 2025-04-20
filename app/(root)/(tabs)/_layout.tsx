import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '@/lib/ContextProvider';
import { View } from 'react-native';
import { Bell, Menu, Search, UserRound } from 'lucide-react-native';
import HomeScreen from './index'; // Assuming this is your home screen
import SearchScreen from './SearchScreen'; 


const Tab = createBottomTabNavigator();

export default function TabsLayout() {
    return (
        <AuthProvider>
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: { backgroundColor: '#12191D' },
                        tabBarActiveTintColor: '#0072E9',
                        tabBarInactiveTintColor: '#7C98A9',
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => <Menu color={color} size={size} />,
                        }}
                    />
                    <Tab.Screen
                        name="Search"
                        component={SearchScreen} // Create a SearchScreen component
                        options={{
                            tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
                        }}
                    />
                </Tab.Navigator>
        </AuthProvider>
    );
}