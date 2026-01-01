import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import FlightResultsScreen from './src/screens/FlightResultsScreen';
import HotelResultsScreen from './src/screens/HotelResultsScreen';
import BookingFormScreen from './src/screens/BookingFormScreen';
import BookingSuccessScreen from './src/screens/BookingSuccessScreen';
import FlightStatusScreen from './src/screens/FlightStatusScreen';

const Stack = createStackNavigator();

// Navigation component that uses auth context
const AppNavigator = () => {
    const { isAuthenticated, loading } = useAuth();

    // Show loading screen while checking auth
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4A0E95" />
                <Text style={{ marginTop: 20, color: '#333' }}>Starting Application...</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#fff' } }}>
                {!isAuthenticated ? (
                    // Unauthenticated screens
                    <>
                        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                ) : (
                    // Authenticated screens
                    // Authenticated screens
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Profile" component={ProfileScreen} />
                        <Stack.Screen name="FlightResults" component={FlightResultsScreen} />
                        <Stack.Screen name="HotelResults" component={HotelResultsScreen} />
                        <Stack.Screen name="BookingForm" component={BookingFormScreen} />
                        <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} />
                        <Stack.Screen name="FlightStatus" component={FlightStatusScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <AuthProvider>
                    <AppNavigator />
                </AuthProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default App;
