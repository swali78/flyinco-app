/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Image,
    Alert,
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import { validateLoginForm } from '../utils/validation';

const LoginScreen = ({ navigation }) => {
    const { login, socialLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    /**
     * Handle login button press
     */
    const handleLogin = async () => {
        // Clear previous errors
        setErrors({});

        // Validate form
        const validation = validateLoginForm(email, password);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        // Show loading state
        setLoading(true);

        try {
            // Attempt login
            const result = await login(email, password);

            if (result.success) {
                // Navigation will happen automatically via AuthContext
                // User will be redirected to Home screen
            } else {
                // Show error message
                Alert.alert('Login Failed', result.error || 'Invalid email or password. Please try again.');
            }
        } catch (error) {
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handle social login (Google/Facebook)
     * Note: This requires additional setup with Google/Facebook SDKs
     */
    /**
     * Handle social login (Google/Facebook)
     */
    const handleSocialLogin = async (provider) => {
        try {
            const result = await socialLogin(provider);
            // If the login is successful, navigation is handled by AuthContext (isAuthenticated changes)
        } catch (error) {
            Alert.alert('Error', `${provider} login failed. Please try again.`);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header Section */}
            <View style={styles.header}>
                <Image
                    source={require('../assets/logo_full.png')}
                    style={{ width: 220, height: 90, marginBottom: 10 }}
                    resizeMode="contain"
                />
                <Text style={styles.subtitle}>Welcome back!</Text>
            </View>

            {/* Form Section */}
            <View style={styles.form}>
                {/* Email Input */}
                <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                    <Icon name="email-outline" size={20} color="#848080" style={styles.inputIcon} />
                    <TextInput
                        placeholder="Email Address"
                        placeholderTextColor="#C4C4C4"
                        style={styles.input}
                        onChangeText={(text) => {
                            setEmail(text);
                            // Clear error when user types
                            if (errors.email) {
                                setErrors({ ...errors, email: null });
                            }
                        }}
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!loading}
                    />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                {/* Password Input */}
                <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                    <Icon name="lock-outline" size={20} color="#848080" style={styles.inputIcon} />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#C4C4C4"
                        style={styles.input}
                        onChangeText={(text) => {
                            setPassword(text);
                            // Clear error when user types
                            if (errors.password) {
                                setErrors({ ...errors, password: null });
                            }
                        }}
                        value={password}
                        secureTextEntry={secureTextEntry}
                        editable={!loading}
                    />
                    <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                        <Icon
                            name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color="#848080"
                        />
                    </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                {/* Forgot Password */}
                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <Button
                    title={loading ? 'Logging in...' : 'Login'}
                    buttonStyle={styles.loginButton}
                    titleStyle={styles.loginButtonText}
                    onPress={handleLogin}
                    disabled={loading}
                    loading={loading}
                />
            </View>

            {/* Social & Footer Section */}
            <View style={styles.footer}>
                <Text style={styles.orText}>- OR CONTINUE WITH -</Text>

                <View style={styles.socialButtons}>
                    <Button
                        icon={<Icon name="google" size={20} color="#EA4335" />}
                        buttonStyle={styles.socialButton}
                        type="outline"
                        onPress={() => handleSocialLogin('Google')}
                        disabled={loading}
                    />
                    <Button
                        icon={<Icon name="facebook" size={20} color="#3B5998" />}
                        buttonStyle={styles.socialButton}
                        type="outline"
                        onPress={() => handleSocialLogin('Facebook')}
                        disabled={loading}
                    />
                </View>

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation && navigation.navigate('Register')}>
                        <Text style={styles.signupLink}>Create now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingTop: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 0,
    },
    titleThin: {
        fontFamily: 'Poppins-Light',
        fontSize: 40,
        color: '#3B3B3B',
        lineHeight: 45,
        letterSpacing: -3,
    },
    titleBold: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 40,
        color: '#4A0E95',
        lineHeight: 45,
        letterSpacing: -3,
    },
    subtitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#848080',
        marginTop: 5,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 5,
        height: 55,
    },
    inputError: {
        borderWidth: 1,
        borderColor: '#FF6B6B',
        backgroundColor: '#FFF5F5',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        color: '#3B3B3B',
        fontSize: 14,
    },
    errorText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#FF6B6B',
        marginBottom: 10,
        marginLeft: 5,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 30,
    },
    forgotPasswordText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        color: '#4A0E95',
    },
    loginButton: {
        backgroundColor: '#4A0E95',
        borderRadius: 12,
        height: 55,
        shadowColor: '#4A0E95',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    loginButtonText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#FFFFFF',
    },
    footer: {
        alignItems: 'center',
        marginTop: 40,
    },
    orText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
        color: '#C4C4C4',
        marginBottom: 20,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    socialButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: '#EFEFEF',
        borderWidth: 1,
        marginHorizontal: 10,
        backgroundColor: '#fff',
    },
    signupContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    signupText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: '#848080',
    },
    signupLink: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 13,
        color: '#4A0E95',
    },
});

export default LoginScreen;
