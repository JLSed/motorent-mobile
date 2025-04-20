import { useAuth } from '@/lib/ContextProvider';
import { signOutUser, supabase } from '@/lib/supabase';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import AvailableUnits from './AvailableUnits'; // Import the UnitsList component

export default function Index() {
  const [units, setUnits] = useState<any[]>([]); // State to store units
  const [loading, setLoading] = useState(true); // State for loading
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  // Fetch units from Supabase
  const fetchUnits = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('UNITS')
        .select('*')
        .order('created_at', { ascending: false }); // Order by recently added

      if (error) throw error;

      setUnits(data || []);
    } catch (error: any) {
      console.error('Error fetching units:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Pull-to-refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUnits(); // Re-fetch the units
    setRefreshing(false);
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  // Helper function to check if a unit is recently added (e.g., within 7 days)
  const isNewUnit = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffInDays =
      (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 7; // Consider "new" if added within the last 7 days
  };

  return (
    <SafeAreaView className="bg-secondary h-full pb-12">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="mt-2 px-2">
          <Text className="font-poppins-bold text-3xl text-accent-gray">
            Available Units
          </Text>

          {/* Units List */}
          <AvailableUnits
            units={units}
            loading={loading}
            isNewUnit={isNewUnit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
