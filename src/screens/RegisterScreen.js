/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, Alert, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import { COLORS, FONTS } from '../constants/Theme';

const RegisterScreen = ({ navigation }) => {
    const { socialLogin } = useAuth();
    const [loading, setLoading] = useState(false);

    /**
     * Handle social login (Google/Facebook)
     */
    const handleSocialLogin = async (provider) => {
        setLoading(true);
        try {
            // In the actual SDK implementation, the token is fetched by the native modules
            // which I have already integrated in src/services/api.js
            const result = await socialLogin(provider, 'MOCK_TOKEN');

            if (!result.success) {
                Alert.alert('Login Failed', result.error || `Could not sign in with ${provider}`);
            }
        } catch (error) {
            Alert.alert('Error', `${provider} sign-in failed. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.component}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Button
                icon={<Icon name="close" size={25} color={COLORS.textSecondary} />}
                buttonStyle={{ marginTop: 5, borderRadius: 100 }}
                type="clear"
                style={styles.iconflex}
                onPress={() => navigation.navigate('Login')}
            />

            {/* Logo Section - Replaced Text with Image */}
            <Image
                source={require('../assets/logo_full.png')}
                style={{ width: 220, height: 90, marginBottom: 10 }}
                resizeMode="contain"
            />

            <Text style={styles.subtitle}>
                Cheapest Flights & Hotels
            </Text>

            <Image
                style={{ width: 230, height: 230, marginTop: 40, marginBottom: 30 }}
                source={require('../assets/image/trolly.png')}
            />

            {loading ? (
                <View style={{ marginVertical: 20 }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    <Text style={{ fontFamily: FONTS.regular, color: COLORS.textSecondary, marginTop: 10 }}>Connecting...</Text>
                </View>
            ) : (
                <>
                    <Button
                        icon={<Icon name="google" size={18} color="#EA4335" style={{ marginRight: 10 }} />}
                        buttonStyle={styles.socialButton}
                        title="Sign in with Google"
                        titleStyle={styles.socialButtonText}
                        type="outline"
                        onPress={() => handleSocialLogin('Google')}
                    />

                    <Button
                        icon={<Icon name="facebook" size={18} color="#1877F2" style={{ marginRight: 10 }} />}
                        buttonStyle={styles.socialButton}
                        title="Sign in with Facebook"
                        titleStyle={styles.socialButtonText}
                        type="outline"
                        onPress={() => handleSocialLogin('Facebook')}
                    />

                    <Button
                        icon={<Icon name="email-outline" size={18} color={COLORS.primary} style={{ marginRight: 10 }} />}
                        buttonStyle={styles.socialButton}
                        title="Sign in with Email"
                        titleStyle={styles.socialButtonText}
                        type="outline"
                        onPress={() => navigation.navigate('Login')}
                    />
                </>
            )}

            <Text style={styles.termsText}>
                By continuing, you are indicating that you accept {'\n'}
                our{' '}
                <Text style={styles.linkText}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    component: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 40,
    },
    iconflex: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: FONTS.regular,
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: -10,
    },
    socialButton: {
        width: 280,
        height: 55,
        marginVertical: 8,
        borderColor: '#E0E0E0',
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        borderWidth: 1,
    },
    socialButtonText: {
        fontSize: 15,
        fontFamily: FONTS.medium,
        color: COLORS.textPrimary,
    },
    termsText: {
        fontSize: 11,
        textAlign: 'center',
        marginTop: 30,
        fontFamily: FONTS.regular,
        color: COLORS.textSecondary,
        lineHeight: 18,
    },
    linkText: {
        color: COLORS.primary,
        textDecorationLine: 'underline',
        fontFamily: FONTS.medium,
    },
});

export default RegisterScreen;
