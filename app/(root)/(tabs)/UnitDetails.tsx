import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createRequest, getCurrentUser } from '@/lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowBigDownDash,
  Banknote,
  CalendarDays,
  MoveLeft,
  Wallet,
} from 'lucide-react-native';
import { IMAGES } from '@/constants/image';

export default function UnitDetails({ route, navigation }: any) {
  const { unit } = route.params; // Get the unit data passed via navigation

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Cash'); // Default payment method

  // Calculate day duration and total cost
  const calculateDurationAndCost = () => {
    if (startDate && endDate) {
      const duration =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1; // Add 1 to include the start date
      const totalCost = duration * parseInt(unit.hourly_rate) * 24; // Daily rate = hourly rate * 24
      return { duration, totalCost };
    }
    return { duration: 0, totalCost: 0 };
  };

  const { duration, totalCost } = calculateDurationAndCost();

  const handleRequest = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        Alert.alert('Error', 'You must be logged in to request a unit.');
        return;
      }

      if (!firstName || !lastName || !contactNum || !startDate || !endDate) {
        Alert.alert('Error', 'Please fill in all fields.');
        return;
      }

      const { duration, totalCost } = calculateDurationAndCost();

      if (duration <= 0 || totalCost <= 0) {
        Alert.alert('Error', 'Invalid dates selected.');
        return;
      }

      await createRequest(
        user.email || '',
        contactNum,
        unit.unit_id,
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0],
        firstName,
        lastName,
        paymentMethod,
        duration, // Pass duration in days
        totalCost // Pass total cost
      );

      Alert.alert('Success', 'Your request has been submitted.');
      navigation.goBack(); // Navigate back after successful submission
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView className="relative flex-1 bg-secondary">
      <ScrollView>
        <TouchableOpacity
          className="flex-row items-center gap-2 bg-accent-gray mt-4 px-4 py-2 rounded-2xl rounded-tl-none rounded-bl-none absolute top-0 left-0 z-10"
          onPress={() => navigation.goBack()}
        >
          <MoveLeft color="white" size={24} />
          <Text className="text-center text-white font-poppins-bold text-lg">
            Go Back
          </Text>
        </TouchableOpacity>
        <Image
          source={{ uri: unit.image_url }}
          className="w-full h-64 rounded-lg mb-4"
          resizeMode="cover"
        />
        <View className="absolute gap-2 right-0 top-4 px-2 py-1">
          <View className="items-end justify-center rounded-full">
            <Text className="bg-accent-gray px-4 rounded-full font-poppins-bold text-xl py-1 text-secondary">
              {unit.transmission}
            </Text>
          </View>
          <View className="items-end justify-center rounded-full">
            <Text className="bg-accent-gray px-4 rounded-full font-poppins-bold text-xl py-1 text-secondary">
              {unit.horsepower} HP
            </Text>
          </View>
          <View className="items-end justify-center rounded-full">
            <Text className="bg-accent-gray px-4 rounded-full font-poppins-bold text-xl py-1 text-secondary">
              {unit.engine_displacement} CC
            </Text>
          </View>
        </View>
        <View className="px-4">
          <Text className="font-poppins-bold text-4xl text-primary">
            {unit.name}
          </Text>
          <Text className="font-poppins-regular text-lg text-gray-500 mb-2">
            Hourly Rate: {unit.hourly_rate} PHP
          </Text>
        </View>
        {/* Form */}
        <View className="bg-accent-light pt-8 rounded-tl-3xl rounded-tr-3xl px-4 pb-4">
          <Text className="text-secondary font-poppins-bold text-3xl mb-4 text-center">
            Book Now!
          </Text>
          <View className="mb-4">
            <Text className="font-outfit-bold text-secondary text-xl mb-2">
              Contact Details
            </Text>
            <Text className="font-outfit-bold text-gray-300 mb-1">
              First Name
            </Text>
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              className="bg-secondary font-monstserrat-bold p-3 rounded-lg mb-2"
            />
            <Text className="font-outfit-bold text-gray-300 mb-1">
              Last Name
            </Text>
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              className="bg-secondary font-monstserrat-bold p-3 rounded-lg mb-2"
            />
            <View className="flex-row gap-2 items-center mt-4">
              <Text className="font-outfit-bold text-gray-300 mb-1">
                Contact Number :
              </Text>
              <TextInput
                placeholder="Ex. 09392795218"
                value={contactNum}
                onChangeText={setContactNum}
                keyboardType="phone-pad"
                className="bg-secondary font-monstserrat-bold p-3 rounded-lg mb-2 flex-1"
              />
            </View>
          </View>
          <View className="h-[2px] w-full bg-secondary mb-6"></View>
          <Text className="font-outfit-bold text-secondary text-xl mb-2">
            Duration and Cost
          </Text>
          {/* Start Date Picker */}
          <TouchableOpacity
            className="bg-secondary font-monstserrat-bold p-3 rounded-lg mb-2"
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text className="font-monstserrat-bold">
              {startDate
                ? `Start Date: ${startDate.toISOString().split('T')[0]}`
                : 'Select Start Date'}
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center mb-2">
            <ArrowBigDownDash color={'white'} />
          </View>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              minimumDate={new Date()} // Restrict past dates
              onChange={(event, selectedDate) => {
                setShowStartDatePicker(false);
                if (selectedDate) setStartDate(selectedDate);
              }}
            />
          )}

          {/* End Date Picker */}
          <TouchableOpacity
            className="bg-secondary p-3 rounded-lg mb-2"
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text className="font-monstserrat-bold">
              {endDate
                ? `End Date: ${endDate.toISOString().split('T')[0]}`
                : 'Select End Date'}
            </Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              minimumDate={startDate || new Date()} // Restrict past dates and ensure end date is after start date
              onChange={(event, selectedDate) => {
                setShowEndDatePicker(false);
                if (selectedDate) setEndDate(selectedDate);
              }}
            />
          )}
          <View className="flex-row gap-2 my-2">
            {/* Duration and Total Cost */}
            {duration > 0 && (
              <View className="flex-1 flex-col items-center justify-center bg-secondary p-3 rounded-lg mb-2">
                <Text className="font-poppins-bold text-xl text-primary">
                  Duration
                </Text>
                <View className="flex-row items-center gap-1">
                  <CalendarDays color={'#f97316'} />
                  <Text className="font-poppins-bold text-2xl text-orange-500">
                    {duration} day(s)
                  </Text>
                </View>
              </View>
            )}
            {totalCost > 0 && (
              <View className="flex-1 flex-col items-center justify-center bg-secondary p-3 rounded-lg mb-2">
                <Text className="font-poppins-bold text-xl text-primary">
                  Total Cost
                </Text>
                <View className="flex-row gap-1">
                  <Wallet color={'#60a5fa'} />
                  <Text className="font-poppins-bold text-2xl text-blue-400">
                    {totalCost} PHP
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View className="h-[2px] w-full bg-secondary mb-6"></View>
          <Text className="font-outfit-bold text-secondary text-xl mb-2">
            Payment Method
          </Text>

          {/* Payment Method */}
          <View className="flex-row mb-4 gap-2">
            <TouchableOpacity
              className={`flex-row items-center gap-2 flex-1 p-3 rounded-lg ${
                paymentMethod === 'Cash' ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              onPress={() => setPaymentMethod('Cash')}
            >
              <Banknote color={'white'} size={24} />
              <Text className="text-white text-xl font-poppins-bold">Cash</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 p-3 rounded-lg ${
                paymentMethod === 'Gcash' ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              onPress={() => setPaymentMethod('Gcash')}
            >
              <Image
                source={IMAGES.gcashLogo}
                className="w-32 h-6 rounded-lg"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bg-green-500 px-4 py-4 rounded-lg"
            onPress={handleRequest}
          >
            <Text className="text-center text-white font-poppins-bold text-lg">
              Submit Request
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
