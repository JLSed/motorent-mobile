import { parse } from '@babel/core';
import {
  BicepsFlexed,
  Bolt,
  FastForward,
  Turtle,
  Zap,
} from 'lucide-react-native';
import React from 'react';
import { FlatList, Text, View, Image, TouchableOpacity } from 'react-native';

interface Unit {
  unit_id: string;
  name: string;
  hourly_rate: string;
  transmission: string;
  horsepower: string;
  engine_displacement: string;
  purchased_date: string;
  created_at: string;
  image_url: string;
}

interface UnitsListProps {
  units: Unit[];
  loading: boolean;
  isNewUnit: (createdAt: string) => boolean;
}

const UnitsList: React.FC<UnitsListProps> = ({ units, loading, isNewUnit }) => {
  return (
    <>
      {loading ? (
        <Text className="text-center text-black-400 mt-4">
          Loading units...
        </Text>
      ) : (
        <FlatList
          data={units}
          keyExtractor={(item) => item.unit_id}
          horizontal // Enable horizontal scrolling
          showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
          contentContainerStyle={{ paddingHorizontal: 16 }} // Add padding to the list
          renderItem={({ item }) => (
            <View className="w-60 mr-4 bg-black-100 rounded-lg border-2 border-gray-200 p-3 relative">
              {/* "New Unit" Label */}
              {isNewUnit(item.created_at) && (
                <Text className="absolute top-2 font-monstserrat-bold right-2 text-xs bg-orange-400 text-white rounded-full px-2 py-1">
                  New Unit
                </Text>
              )}

              {/* Motor Image */}
              <Image
                source={{ uri: item.image_url }}
                className="w-full h-32 rounded-lg mb-2"
                resizeMode="cover"
              />

              {/* Unit Details */}
              <Text className="font-outfit-bold text-2xl text-primary mb-2">
                {item.name}
              </Text>
              <View className="flex-row items-center justify-evenly mb-2 gap-4">
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
              <View>
                <Text className="font-poppins-bold text-sm text-gray-400">
                  {item.hourly_rate} PHP Hourly Rate
                </Text>
                <Text className="font-poppins-bold text-2xl text-orange-400">
                  {parseInt(item.hourly_rate) * 24} PHP / Day
                </Text>
              </View>
              {/* Book Button */}
              <TouchableOpacity className="bg-blue-500 mt-2 bg-blue px-2 py-2 rounded-md">
                <Text className="text-center text-secondary font-poppins-bold text-lg">
                  Book
                </Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text
              style={{ textAlign: 'center', color: '#A0AEC0', marginTop: 16 }}
            >
              No units available at the moment.
            </Text>
          }
        />
      )}
    </>
  );
};

export default UnitsList;
