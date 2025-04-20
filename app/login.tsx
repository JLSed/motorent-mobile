import { View, Text, KeyboardAvoidingView, TextInput, Platform, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { router} from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { loginUser } from '@/lib/supabase';
export default function login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => { 
        try {
            const user = await loginUser(email, password);
            console.log('User logged in:', user);
            Alert.alert('Success', 'You are now logged in!');
            // Navigate to home screen or dashboard after successful login
            router.replace('/(root)/(tabs)');
        } catch (error: any) {
            console.error(error);
            Alert.alert('Login Failed', error.message);
        }
    }

  return (
      <KeyboardAvoidingView
          className="flex-1 flex bg-white justify-center px-6"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
          <View className='flex flex-1 justify-center items-center'>
              <Text className="font-monstserrat-bold text-5xl">MOTORENT</Text>
              <Text className="font-monstserrat-regular text-primary text-lg">Yours Journey, Our Ride.</Text>
          </View>
          <View className="flex-1">
              <View>
                  <Text className="text-sm mb-1 text-gray-700 font-outfit-regular">Email</Text>
                  <TextInput
                      className="border border-primary rounded-lg px-4 py-3 text-base font-poppins-regular"
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                  />
              </View>
              <View className="my-2">
                  <Text className="text-sm mb-1 text-gray-700 font-outfit-regular">Password</Text>
                  <View className="flex-row items-center border border-primary rounded-lg px-4">
                      <TextInput
                          className="flex-1 py-3 text-base font-poppins-regular"
                          placeholder="Enter your password"
                          secureTextEntry={!showPassword}
                          value={password}
                          onChangeText={setPassword}
                      />
                      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOff color={'black'} size={20} /> : <Eye color={'black'} size={20} />}
                      </TouchableOpacity>
                  </View>
              </View>

              <TouchableOpacity onPress={() =>  router.push("/signup")}>
                  <Text className="text-right text-sm text-blue-600 mb-6 font-outfit-regular">Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  onPress={handleLogin}
                  className="bg-blue-600 rounded-lg py-3 mb-4"
              >
                  <Text className="text-white text-center text-lg font-outfit-bold">Login</Text>
              </TouchableOpacity>

              <View className="flex-row justify-center">
                  <Text className="text-gray-600 font-outfit-regular">Don't have an account? </Text>
                  <TouchableOpacity onPress={() =>  router.push("/signup")}>
                      <Text className="text-blue-600 font-outfit-regular">Sign Up</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </KeyboardAvoidingView>
  )
}