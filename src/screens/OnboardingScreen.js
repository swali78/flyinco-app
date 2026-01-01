import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS } from '../constants/Theme';

const slides = [
    {
        key: 'slide1',
        title: 'Select your travel dates and destination',
        text: 'Find the best deals on flights and hotels tailored to your schedule and preferences.',
        image: require('../assets/image/oc1.png'),
    },
    {
        key: 'slide2',
        title: 'Get the cheapest fare available',
        text: 'We compare hundreds of airlines and hotels to ensure you get the most value for your money.',
        image: require('../assets/image/oc2.png'),
    },
    {
        key: 'slide3',
        title: 'Travel and conquer your destination',
        text: 'Book with confidence and start your journey today with our seamless planning tools.',
        image: require('../assets/image/oc3.png'),
    },
];

const OnboardingScreen = ({ navigation }) => {
    const renderNextButton = () => (
        <View style={styles.buttonCircle}>
            <Icon
                name="arrow-right"
                color="#FFF"
                size={24}
            />
        </View>
    );

    const renderDoneButton = () => (
        <View style={styles.buttonCircleFinish}>
            <Icon
                name="check"
                color="#FFF"
                size={24}
            />
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
            {/* Logo Section */}
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/logo_full.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <AppIntroSlider
                data={slides}
                renderItem={renderItem}
                doneLabel="Get Started"
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                renderDoneButton={renderDoneButton}
                renderNextButton={renderNextButton}
                onDone={() => navigation.replace('Register')}
            />

            {/* Skip/Login option */}
            <TouchableOpacity
                style={styles.skipButton}
                onPress={() => navigation.replace('Login')}
            >
                <Text style={styles.skipButtonText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
};



const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 10,
    },
    logo: {
        width: 200,
        height: 80,
        marginTop: 10,
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        paddingBottom: 100,
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontFamily: FONTS.semiBold,
        color: COLORS.textPrimary,
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 32,
    },
    text: {
        fontSize: 14,
        fontFamily: FONTS.regular,
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
    },
    buttonCircle: {
        width: 44,
        height: 44,
        backgroundColor: COLORS.primary,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonCircleFinish: {
        width: 44,
        height: 44,
        backgroundColor: COLORS.success,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        backgroundColor: COLORS.border,
        width: 8,
        height: 8,
    },
    activeDot: {
        backgroundColor: COLORS.primary,
        width: 20,
        height: 8,
    },
    skipButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        padding: 10,
        zIndex: 1,
    },
    skipButtonText: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.textSecondary,
    },
});

export default OnboardingScreen;
