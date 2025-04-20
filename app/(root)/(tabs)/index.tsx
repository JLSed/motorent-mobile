import { useAuth } from "@/lib/ContextProvider";
import { signOutUser } from "@/lib/supabase";
import { Link } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const user = useAuth();
  const handleLogOut = async () => { 
          try {
              const user = await signOutUser();
          } catch (error: any) {
              console.error(error);
              Alert.alert('Login Failed', error.message);
          }
      }

      return (
        <SafeAreaView className="bg-secondary h-full">
      <View className="mt-2 px-2">
      <Text className="font-outfit-regular text-2xl">Welcome, {user.session?.user.email}</Text>
        <Text className="font-poppins-bold text-3xl text-center text-accent-gray">Available Units</Text>
        <TouchableOpacity className="p-4 bg-red-600" onPress={handleLogOut}>
          <Text className="font-outfit-bold text-2xl text-secondary">(Temp) Log Out</Text>
        </TouchableOpacity>
        <View></View>
      </View>
    </SafeAreaView>
  );
}
