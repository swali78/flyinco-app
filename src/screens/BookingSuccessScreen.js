/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Alert
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BookingSuccessScreen = ({ route, navigation }) => {
    const { flight, passenger } = route.params;

    const handleDownload = () => {
        Alert.alert('Download', 'Your ticket has been saved to your specific folder.');
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#4A0E95" />

            <View style={styles.successHeader}>
                <View style={styles.iconCircle}>
                    <Icon name="check" size={40} color="#4A0E95" />
                </View>
                <Text style={styles.successTitle}>Booking Confirmed!</Text>
                <Text style={styles.successSubtitle}>Your trip to {flight.to} is all set.</Text>
            </View>

            {/* Ticket View */}
            <View style={styles.ticketContainer}>
                {/* Upper Part */}
                <View style={styles.ticketUpper}>
                    <View style={styles.airlineRow}>
                        <Text style={styles.airlineName}>{flight.airline}</Text>
                        <Text style={styles.flightNo}>{flight.flightNo}</Text>
                    </View>

                    <View style={styles.routeRow}>
                        <View>
                            <Text style={styles.cityCode}>{flight.from}</Text>
                            <Text style={styles.cityName}>Origin</Text>
                        </View>
                        <Icon name="airplane" size={24} color="#4A0E95" style={styles.planeIcon} />
                        <View>
                            <Text style={[styles.cityCode, { textAlign: 'right' }]}>{flight.to}</Text>
                            <Text style={[styles.cityName, { textAlign: 'right' }]}>Destination</Text>
                        </View>
                    </View>

                    <View style={styles.detailsRow}>
                        <View>
                            <Text style={styles.detailLabel}>Date</Text>
                            <Text style={styles.detailValue}>{flight.date}</Text>
                        </View>
                        <View>
                            <Text style={styles.detailLabel}>Time</Text>
                            <Text style={styles.detailValue}>{flight.depTime}</Text>
                        </View>
                        <View>
                            <Text style={styles.detailLabel}>Gate</Text>
                            <Text style={styles.detailValue}>A12</Text>
                        </View>
                        <View>
                            <Text style={styles.detailLabel}>Seat</Text>
                            <Text style={styles.detailValue}>4B</Text>
                        </View>
                    </View>
                </View>

                {/* Divider */}
                <View style={styles.ticketDivider}>
                    <View style={styles.halfCircleLeft} />
                    <View style={styles.dashedLine} />
                    <View style={styles.halfCircleRight} />
                </View>

                {/* Lower Part (Passenger Info) */}
                <View style={styles.ticketLower}>
                    <View style={styles.passengerRow}>
                        <View>
                            <Text style={styles.detailLabel}>Passenger</Text>
                            <Text style={styles.passengerName}>{passenger.firstName} {passenger.lastName}</Text>
                        </View>
                        <View>
                            <Text style={styles.detailLabel}>Class</Text>
                            <Text style={styles.detailValue}>Economy</Text>
                        </View>
                    </View>

                    <View style={styles.barcodeContainer}>
                        {/* Visual Barcode Representation */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', height: 40, alignItems: 'center', overflow: 'hidden' }}>
                            {[...Array(30)].map((_, i) => (
                                <View key={i} style={{ width: Math.random() * 3 + 1, height: '100%', backgroundColor: '#3B3B3B', marginRight: 2 }} />
                            ))}
                        </View>
                        <Text style={styles.ticketId}>ID: 894523095823</Text>
                    </View>
                </View>
            </View>

            <View style={styles.actions}>
                <Button
                    title="Download Ticket"
                    buttonStyle={styles.downloadButton}
                    titleStyle={styles.downloadButtonText}
                    onPress={handleDownload}
                    icon={<Icon name="download" size={20} color="#FFFFFF" style={{ marginRight: 10 }} />}
                />

                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.homeLink}>
                    <Text style={styles.homeLinkText}>Back to Home</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4A0E95',
    },
    contentContainer: {
        paddingBottom: 40,
        alignItems: 'center',
    },
    successHeader: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 40,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    successTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#FFF',
        marginBottom: 5,
    },
    successSubtitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: '#BBB',
    },
    ticketContainer: {
        width: '85%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        overflow: 'hidden',
    },
    ticketUpper: {
        padding: 25,
    },
    airlineRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    airlineName: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: '#3B3B3B',
    },
    flightNo: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#848080',
    },
    routeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    cityCode: {
        fontFamily: 'Poppins-Bold',
        fontSize: 32,
        color: '#3B3B3B',
    },
    cityName: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#848080',
    },
    planeIcon: {
        transform: [{ rotate: '90deg' }]
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailLabel: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#848080',
        marginBottom: 2,
    },
    detailValue: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: '#3B3B3B',
    },
    ticketDivider: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 20,
        backgroundColor: '#FFF',
    },
    halfCircleLeft: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#4A0E95',
        marginLeft: -10,
    },
    dashedLine: {
        flex: 1,
        height: 1,
        borderWidth: 1,
        borderRadius: 1,
        borderStyle: 'dashed',
        borderColor: '#E0E0E0',
        marginHorizontal: 10,
    },
    halfCircleRight: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#4A0E95',
        marginRight: -10,
    },
    ticketLower: {
        padding: 25,
        backgroundColor: '#FAFAFA',
    },
    passengerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    passengerName: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#3B3B3B',
    },
    barcodeContainer: {
        alignItems: 'center',
    },
    ticketId: {
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
        color: '#848080',
        marginTop: 5,
    },
    actions: {
        width: '85%',
        marginTop: 30,
    },
    downloadButton: {
        backgroundColor: '#4A0E95',
        borderRadius: 15,
        height: 55,
        marginBottom: 20,
    },
    downloadButtonText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#FFFFFF',
    },
    homeLink: {
        alignItems: 'center',
    },
    homeLinkText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#FFF',
    },
});

export default BookingSuccessScreen;
