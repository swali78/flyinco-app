/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    Alert
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BookingFormScreen = ({ route, navigation }) => {
    const { flight } = route.params;
    const [loading, setLoading] = useState(false);
    const [passenger, setPassenger] = useState({
        firstName: '',
        lastName: '',
        passport: '',
        email: '',
    });

    const handleBook = () => {
        if (!passenger.firstName || !passenger.lastName || !passenger.email) {
            Alert.alert('Missing Details', 'Please fill in all required fields.');
            return;
        }

        setLoading(true);

        // Simulate API booking process
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('BookingSuccess', {
                flight: flight,
                passenger: passenger
            });
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color="#3B3B3B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Passenger Details</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content}>
                {/* Flight Summary Card */}
                <View style={styles.flightSummary}>
                    <View style={styles.airlineRow}>
                        <Text style={styles.airlineName}>{flight.airline}</Text>
                        <Text style={styles.price}>{flight.currency || '₹'}{flight.price}</Text>
                    </View>
                    <View style={styles.routeRow}>
                        <View>
                            <Text style={styles.cityCode}>{flight.from}</Text>
                            <Text style={styles.time}>{flight.depTime}</Text>
                        </View>
                        <View style={styles.durationContainer}>
                            <Text style={styles.duration}>{flight.duration}</Text>
                            <View style={styles.line} />
                            <Text style={styles.stops}>{flight.stops}</Text>
                        </View>
                        <View>
                            <Text style={[styles.cityCode, { textAlign: 'right' }]}>{flight.to}</Text>
                            <Text style={[styles.time, { textAlign: 'right' }]}>{flight.arrTime}</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Traveler Information</Text>

                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. John"
                            value={passenger.firstName}
                            onChangeText={(text) => setPassenger({ ...passenger, firstName: text })}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Doe"
                            value={passenger.lastName}
                            onChangeText={(text) => setPassenger({ ...passenger, lastName: text })}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Passport Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. A12345678"
                            value={passenger.passport}
                            onChangeText={(text) => setPassenger({ ...passenger, passport: text })}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. john.doe@email.com"
                            keyboardType="email-address"
                            value={passenger.email}
                            onChangeText={(text) => setPassenger({ ...passenger, email: text })}
                        />
                    </View>
                </View>

                {/* Price Breakdown */}
                <View style={styles.breakdownContainer}>
                    <Text style={styles.breakdownTitle}>Fare Breakdown</Text>
                    <View style={styles.breakdownRow}>
                        <Text style={styles.breakdownLabel}>Base Fare</Text>
                        <Text style={styles.breakdownValue}>{flight.currency || '₹'}{flight.price}</Text>
                    </View>
                    <View style={styles.breakdownRow}>
                        <Text style={styles.breakdownLabel}>Taxes & Fees</Text>
                        <Text style={styles.breakdownValue}>{flight.currency || '₹'}450</Text>
                    </View>
                    <View style={[styles.breakdownRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>{flight.currency || '₹'}{flight.price + 450}</Text>
                    </View>
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title={loading ? "Processing..." : "Confirm & Pay"}
                    buttonStyle={styles.bookButton}
                    titleStyle={styles.bookButtonText}
                    onPress={handleBook}
                    disabled={loading}
                    icon={loading ? <ActivityIndicator color="#3B3B3B" /> : null}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingTop: 50,
        paddingBottom: 20,
    },
    backButton: {
        padding: 8,
        borderRadius: 12,
        backgroundColor: '#F5F5F5',
    },
    headerTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: '#3B3B3B',
    },
    content: {
        flex: 1,
        paddingHorizontal: 25,
    },
    flightSummary: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 25,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    airlineRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    airlineName: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#3B3B3B',
    },
    price: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#4A0E95', // Keeping primary color consistent
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    },
    routeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cityCode: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        color: '#3B3B3B',
    },
    time: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#848080',
    },
    durationContainer: {
        alignItems: 'center',
        width: 100,
    },
    duration: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        color: '#848080',
        marginBottom: 5,
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#E0E0E0',
        marginBottom: 5,
    },
    stops: {
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
        color: '#3B3B3B',
    },
    sectionTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: '#3B3B3B',
        marginBottom: 15,
    },
    formContainer: {
        marginBottom: 25,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#848080',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#3B3B3B',
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    breakdownContainer: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 30,
    },
    breakdownTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#3B3B3B',
        marginBottom: 15,
    },
    breakdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    breakdownLabel: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#848080',
    },
    breakdownValue: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: '#3B3B3B',
    },
    totalRow: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    totalLabel: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: '#3B3B3B',
    },
    totalValue: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#3B3B3B',
    },
    footer: {
        padding: 25,
        backgroundColor: '#FFF',
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    bookButton: {
        backgroundColor: '#4A0E95',
        borderRadius: 15,
        height: 55,
    },
    bookButtonText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#FFFFFF',
    },
});

export default BookingFormScreen;
