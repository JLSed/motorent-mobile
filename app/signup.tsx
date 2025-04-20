import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { router} from 'expo-router';
import { signUpUser } from '@/lib/supabase';
import { IMAGES } from '@/constants/image';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Password Mismatch', 'Your passwords do not match.');
            return;
        }
        try {
            const user = await signUpUser(email, password); // Call the signUp function from firebase.ts
            console.log('User created:', user);
            Alert.alert('Success', 'Your account has been created!');
            // Navigate to home screen or dashboard after successful sign-up
            // navigation.navigate('Home');
        } catch (error: any) {
            console.error(error);
            Alert.alert('Sign Up Failed', error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white justify-center px-6 relative"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Image source={IMAGES.logo} className='size-52 self-center' />
            <Text className="text-3xl font-outfit-bold text-center mb-8">Create an Account</Text>

            <View className="mb-4">
                <Text className="text-sm font-outfit-regular mb-1 text-gray-700">Email</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 text-base font-poppins-regular"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View className="mb-2">
                <Text className="text-sm font-outfit-regular mb-1 text-gray-700">Password</Text>
                <View className="flex-row items-center border border-gray-300 rounded-lg px-4">
                    <TextInput
                        className="flex-1 py-3 text-base font-poppins-regular"
                        placeholder="Enter your password"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </TouchableOpacity>
                </View>
            </View>

            <View className="mb-4">
                <Text className="text-sm font-outfit-regular mb-1 text-gray-700">Confirm Password</Text>
                <View className="flex-row items-center border border-gray-300 rounded-lg px-4">
                    <TextInput
                        className="flex-1 py-3 text-base font-poppins-regular"
                        placeholder="Confirm your password"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                onPress={handleSignUp}
                className="bg-blue-600 rounded-lg py-3 mb-4"
            >
                <Text className="text-white text-center text-lg font-outfit-bold">Sign Up</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center">
                <Text className="text-gray-600 font-outfit-regular">Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/login")}>
                    <Text className="text-blue-600 font-outfit-bold">Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};