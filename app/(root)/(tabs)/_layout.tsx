import { AuthProvider } from '@/lib/ContextProvider';
import { Slot } from 'expo-router';
import { Bell, CircleUserRound, Menu, Search, UserRound } from 'lucide-react-native';
import { View, ActivityIndicator, Text } from 'react-native';

export default function TabsLayout() {
    return (
        // Wrap with AuthProvider to manage user authentication
        <AuthProvider>
            <View className='flex flex-row justify-between p-2 bg-primary tedx'>
                <Menu color={'white'} />
                <View className='flex flex-row gap-4'>
                    <Search color={'white'} />
                    <Bell color={'white'} />
                    <CircleUserRound color={'white'} />
                </View>
            </View>
            <View className="flex-1">
                <Slot />
                <Search />
            </View>
        </AuthProvider>
    );
}