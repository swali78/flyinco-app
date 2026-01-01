/**
 * Authentication Context
 * Manages user authentication state across the app
 * Handles login, logout, and user session
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI, setAuthToken } from '../services/api';

// Create context
const AuthContext = createContext();

// Token storage key
const TOKEN_KEY = '@travelfares:auth_token';
const USER_KEY = '@travelfares:user';

/**
 * Auth Provider Component
 * Wraps the app and provides authentication state
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    /**
     * Load saved authentication on app start
     */
    useEffect(() => {
        loadStoredAuth();
        // Failsafe: Ensure loading stops after 2 seconds
        const timer = setTimeout(() => {
            console.log('Force ending loading state');
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    /**
     * Load authentication from storage
     */
    const loadStoredAuth = async () => {
        try {
            const token = await AsyncStorage.getItem(TOKEN_KEY);
            const userData = await AsyncStorage.getItem(USER_KEY);

            if (token && userData) {
                setAuthToken(token);
                setUser(JSON.parse(userData));
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Error loading stored auth:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Login with email and password
     */
    const login = async (email, password) => {
        try {
            const response = await authAPI.login(email, password);

            // Save token and user data
            await AsyncStorage.setItem(TOKEN_KEY, response.token);
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.user));

            setAuthToken(response.token);
            setUser(response.user);
            setIsAuthenticated(true);

            return { success: true, user: response.user };
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Login failed. Please try again.'
            };
        }
    };

    /**
     * Register new user
     */
    const register = async (userData) => {
        try {
            const response = await authAPI.register(userData);

            // Save token and user data
            await AsyncStorage.setItem(TOKEN_KEY, response.token);
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.user));

            setAuthToken(response.token);
            setUser(response.user);
            setIsAuthenticated(true);

            return { success: true, user: response.user };
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Registration failed. Please try again.'
            };
        }
    };

    /**
     * Social login (Google/Facebook)
     */
    const socialLogin = async (provider, token) => {
        try {
            const response = await authAPI.socialLogin(provider, token);

            // Save token and user data
            await AsyncStorage.setItem(TOKEN_KEY, response.token);
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.user));

            setAuthToken(response.token);
            setUser(response.user);
            setIsAuthenticated(true);

            return { success: true, user: response.user };
        } catch (error) {
            return {
                success: false,
                error: error.message || `${provider} login failed. Please try again.`
            };
        }
    };

    /**
     * Logout user
     */
    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear storage and state
            await AsyncStorage.removeItem(TOKEN_KEY);
            await AsyncStorage.removeItem(USER_KEY);
            setAuthToken(null);
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    // Context value
    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        socialLogin,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to use authentication context
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;
