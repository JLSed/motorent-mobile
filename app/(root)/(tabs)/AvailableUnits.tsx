import React from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";

interface Unit {
  unit_id: string;
  name: string;
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
        <Text className="text-center text-gray-400 mt-4">Loading units...</Text>
      ) : (
        <FlatList
          data={units}
          keyExtractor={(item) => item.unit_id}
          renderItem={({ item }) => (
            <View className="p-4 bg-gray-800 my-2 rounded relative">
              {/* "New Unit" Label */}
              {isNewUnit(item.created_at) && (
                <Text className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                  New Unit
                </Text>
              )}

              {/* Motor Image */}
              <Image
                source={{ uri: item.image_url }}
                style={{ width: "100%", height: 200, borderRadius: 8 }}
                resizeMode="cover"
              />

              {/* Unit Details */}
              <Text className="font-outfit-bold text-xl text-white mt-2">{item.name}</Text>
              <Text className="font-outfit-regular text-sm text-gray-300">
                Transmission: {item.transmission}
              </Text>
              <Text className="font-outfit-regular text-sm text-gray-300">
                Horsepower: {item.horsepower}
              </Text>
              <Text className="font-outfit-regular text-sm text-gray-300">
                Engine Displacement: {item.engine_displacement}
              </Text>
              <Text className="font-outfit-regular text-sm text-gray-300">
                Purchased Date: {item.purchased_date}
              </Text>

              {/* Book Button */}
              <TouchableOpacity className="mt-4 bg-blue-600 p-2 rounded">
                <Text className="text-center text-white font-outfit-bold">Book</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-center text-gray-400 mt-4">
              No units available at the moment.
            </Text>
          }
        />
      )}
    </>
  );
};

export default UnitsList;