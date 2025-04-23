import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://setrvqqnjamrxsbpxtya.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNldHJ2cXFuamFtcnhzYnB4dHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNzY5ODEsImV4cCI6MjA1OTc1Mjk4MX0.7WllvSPfeUmhcanBeIuzc33HUglMXdq_BwzDAsFuOHY';

// Login function
export const loginUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data; // Contains user and session info
  } catch (err: any) {
    console.error('Login error:', err.message);
    throw err;
  }
};

// Sign out function
export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return { success: true };
  } catch (err: any) {
    console.error('Sign out error:', err.message);
    throw err;
  }
};

// Sign up function
export const signUpUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return data; // Contains user and session info
  } catch (err: any) {
    console.error('Sign up error:', err.message);
    throw err;
  }
};

// Get current user function
export const getCurrentUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw error;

    return user;
  } catch (err: any) {
    console.error('Get current user error:', err.message);
    return null;
  }
};

// Insert a new request into the REQUESTS table
export const createRequest = async (
  user_email: string,
  contact_num: string,
  unit_id: string,
  start_date: string,
  end_date: string,
  first_name: string,
  last_name: string,
  payment_method: string,
  duration_day: number, // New column for duration in days
  total_cost: number // New column for total cost
) => {
  try {
    const { data, error } = await supabase.from('REQUESTS').insert([
      {
        user_email,
        contact_num,
        unit_id,
        start_date,
        end_date,
        first_name,
        last_name,
        payment_method,
        duration_day, // Include duration in days
        total_cost, // Include total cost
      },
    ]);

    if (error) throw error;

    return data;
  } catch (err: any) {
    console.error('Create request error:', err.message);
    throw err;
  }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
