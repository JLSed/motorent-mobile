import { useAuth } from "@/lib/ContextProvider";
import { signOutUser, supabase } from "@/lib/supabase";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AvailableUnits from "./AvailableUnits"; // Import the UnitsList component

export default function Index() {
  const user = useAuth();
  const [units, setUnits] = useState([]); // State to store units
  const [loading, setLoading] = useState(true); // State for loading

  const handleLogOut = async () => {
    try {
      await signOutUser();
    } catch (error: any) {
      console.error(error);
      Alert.alert("Login Failed", error.message);
    }
  };

  // Fetch units from Supabase
  const fetchUnits = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("UNITS")
        .select("*")
        .order("created_at", { ascending: false }); // Order by recently added

      if (error) throw error;

      setUnits(data || []);
    } catch (error: any) {
      console.error("Error fetching units:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  // Helper function to check if a unit is recently added (e.g., within 7 days)
  const isNewUnit = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffInDays = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 7; // Consider "new" if added within the last 7 days
  };

  return (
    <SafeAreaView className="bg-secondary h-full">
      <View className="mt-2 px-2">
        <Text className="font-outfit-regular text-2xl">
          Welcome, {user.session?.user.email}
        </Text>
        <Text className="font-poppins-bold text-3xl text-center text-accent-gray">
          Available Units
        </Text>

        {/* Units List */}
        <AvailableUnits units={units} loading={loading} isNewUnit={isNewUnit} />

        <TouchableOpacity className="p-4 bg-red-600 mt-4" onPress={handleLogOut}>
          <Text className="font-outfit-bold text-2xl text-secondary">(Temp) Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
