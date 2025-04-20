import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from '@/lib/ContextProvider';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Bell,
  CircleUser,
  LogOut,
  Menu,
  Search,
  Settings,
  UserCog2,
} from 'lucide-react-native';
import HomeScreen from './index'; // Assuming this is your home screen
import SearchScreen from './SearchScreen'; // Assuming this is your search screen
import { signOutUser } from '@/lib/supabase';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogOut = async () => {
    try {
      await signOutUser();
      Alert.alert('Sign Out', 'You have been logged out.');
      setIsModalVisible(false); // Close the modal after logout
    } catch (error: any) {
      console.error('Logout error:', error.message);
      Alert.alert('Logout Failed', error.message);
    }
  };

  return (
    <AuthProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: true, // Enable the header
          headerStyle: { backgroundColor: '#12191D' }, // Header background color
          headerTitleAlign: 'center', // Center the title
          headerTitle: () => (
            <Text
              style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}
            >
              MOTORENT
            </Text>
          ), // Custom title
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 16 }}>
              <Menu color="#FFFFFF" size={24} />
            </TouchableOpacity>
          ), // Menu icon on the left
          headerRight: () => (
            <View className="flex-row items-center mr-4 gap-6">
              <Bell color="#FFFFFF" size={24} />
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <CircleUser color="#FFFFFF" size={24} />
              </TouchableOpacity>
            </View>
          ), // Notification icon and user icon on the right
          tabBarStyle: { backgroundColor: '#12191D' }, // Tab bar background color
          tabBarActiveTintColor: '#0072E9', // Active tab color
          tabBarInactiveTintColor: '#7C98A9', // Inactive tab color
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
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Search color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>

      {/* Modal for Submenu */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity className="bg-black/20 flex-1 justify-end items-center">
          <View className="w-full bg-white rounded-xl rounded-br-none rounded-bl-none p-4 items-center">
            <Text className="font-poppins-bold text-2xl mb-10 text-gray-300 w-full text-center">
              User Menu
            </Text>
            <TouchableOpacity className="flex-row items-end justify-center gap-2 rounded-lg py-3 w-full">
              <UserCog2 color={'black'} />
              <Text className="font-poppins-bold text-primary">Account</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-end justify-center gap-2 rounded-lg py-3 w-full">
              <Settings color="black" />
              <Text className="font-poppins-bold text-primary">Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-end justify-center gap-2 rounded-lg py-3 w-full"
              onPress={handleLogOut}
            >
              <LogOut color="#FF4D4D" />
              <Text className="font-poppins-bold text-red-500">Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-full mt-4"
              onPress={() => setIsModalVisible(false)}
            >
              <Text className="font-poppins-bold text-blue-500 border-t-2 border-gray-300 text-center text-xl pt-4">
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </AuthProvider>
  );
}
