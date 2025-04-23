import {
  BicepsFlexed,
  Bolt,
  FastForward,
  Turtle,
  Zap,
} from 'lucide-react-native';
import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RootStackParamList, Unit } from '@/types/type'; // Import types
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface UnitsListProps {
  units: Unit[];
  loading: boolean;
}

const UnitsList: React.FC<UnitsListProps> = ({ units, loading }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleUnavailableClick = (status: string) => {
    const message =
      status === 'OCCUPIED'
        ? 'This unit is currently occupied and not available.'
        : 'This unit is under maintenance and not available.';
    Alert.alert('Unit Unavailable', message);
  };

  return (
    <>
      {loading ? (
        <Text className="text-center text-black-400 mt-4">
          Loading recent units...
        </Text>
      ) : (
        <FlatList
          data={units}
          keyExtractor={(item) => item.unit_id}
          horizontal // Enable horizontal scrolling
          showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
          contentContainerStyle={{ paddingHorizontal: 16 }} // Add padding to the list
          renderItem={({ item }) => (
            <View className=" mr-4 bg-black-100 rounded-lg border-2 border-gray-200 p-2 relative">
              <Text className="absolute top-0 font-monstserrat-bold right-2 left-2 text-center text-xs bg-orange-400 text-white rounded-full rounded-tl-none rounded-tr-none px-2 py-1 z-10">
                New Unit
              </Text>
              {/* Status Label */}
              {item.status === 'OCCUPIED' && (
                <Text className="absolute right-0 top-1/4 z-10 bg-red-700 font-poppins-bold text-2xl text-white rounded-full rounded-r-none px-2 py-1">
                  Rented
                </Text>
              )}
              {item.status === 'MAINTENANCE' && (
                <Text className="absolute right-0 top-1/4 z-10 bg-orange-700 font-poppins-bold text-2xl text-white rounded-full rounded-r-none px-2 py-1">
                  Repairing
                </Text>
              )}
              <Text className="absolute right-0 bottom-1/2 z-10 bg-orange-400 font-poppins-bold text-2xl text-white rounded-full rounded-r-none px-2 py-1">
                {parseInt(item.hourly_rate) * 24} PHP / Day
              </Text>
              <View className="flex-row items-center justify-between mt-4">
                <View className="flex-col items-center justify-evenly mb-2 gap-2">
                  <View className="flex-col items-center">
                    <Bolt color={'black'} />
                    <Text className="font-poppins-bold text-sm color-black">
                      {item.transmission}
                    </Text>
                  </View>
                  <View className="flex-col items-center">
                    <BicepsFlexed color={'black'} />
                    <Text className="font-poppins-bold text-sm color-black">
                      {item.engine_displacement} CC
                    </Text>
                  </View>
                  <View className="flex-col items-center">
                    <Turtle color={'black'} />
                    <Text className="font-poppins-bold text-sm color-black">
                      {item.horsepower} HP
                    </Text>
                  </View>
                </View>
                <View className="">
                  <Image
                    source={{ uri: item.image_url }}
                    className="w-52 h-32 rounded-lg mb-2"
                    resizeMode="cover"
                  />
                </View>
              </View>

              {/* Unit Details */}
              <Text className="font-outfit-bold text-3xl text-primary mb-2">
                {item.name}
              </Text>
              {/* Book Button */}
              <TouchableOpacity
                className={`bg-blue-500 mt-2 px-2 py-2 rounded-md ${
                  item.status !== 'AVAILABLE' ? 'opacity-50' : ''
                }`}
                onPress={() =>
                  item.status === 'AVAILABLE'
                    ? navigation.navigate('UnitDetails', { unit: item })
                    : handleUnavailableClick(item.status)
                }
                disabled={item.status !== 'AVAILABLE'}
              >
                <Text className="text-center text-secondary font-poppins-bold text-lg">
                  {item.status === 'AVAILABLE' ? 'Book' : 'Unavailable'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <View className=" border px-12 py-4 rounded-lg border-gray-200">
              <Text className="text-center text-gray-400">
                No new units available at the moment.
              </Text>
            </View>
          }
        />
      )}
    </>
  );
};

export default UnitsList;
