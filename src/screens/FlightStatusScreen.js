import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { travelAPI } from '../services/api';
import { COLORS, FONTS } from '../constants/Theme';

const FlightStatusScreen = ({ navigation }) => {
    const [flightNo, setFlightNo] = useState('');
    const [statusData, setStatusData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCheckStatus = async () => {
        if (!flightNo || flightNo.length < 3) {
            setError('Please enter a valid flight number (e.g., EK202)');
            return;
        }

        setError(null);
        setLoading(true);
        try {
            const data = await travelAPI.getFlightStatus(flightNo.toUpperCase());
            setStatusData(data);
        } catch (err) {
            setError('Could not retrieve status. Please check the flight number.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color="#3B3B3B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Flight Status</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Search Input Area */}
                <View style={styles.searchSection}>
                    <Text style={styles.label}>Enter Flight Number</Text>
                    <View style={styles.inputContainer}>
                        <Icon name="airplane-search" size={24} color={COLORS.primary} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. EK202, AI101"
                            value={flightNo}
                            onChangeText={setFlightNo}
                            autoCapitalize="characters"
                            placeholderTextColor="#AAA"
                        />
                        <TouchableOpacity style={styles.checkButton} onPress={handleCheckStatus}>
                            <Text style={styles.checkButtonText}>Track</Text>
                        </TouchableOpacity>
                    </View>
                    {error && <Text style={styles.errorText}>{error}</Text>}
                </View>

                {/* Loading State */}
                {loading && (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color={COLORS.primary} />
                        <Text style={styles.loaderText}>Fetching real-time data...</Text>
                    </View>
                )}

                {/* Status Results Card */}
                {statusData && !loading && (
                    <View style={styles.resultCard}>
                        <View style={styles.cardHeader}>
                            <View>
                                <Text style={styles.airlineName}>{statusData.airline}</Text>
                                <Text style={styles.flightNumber}>{statusData.flight_no}</Text>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: statusData.status === 'Scheduled' ? '#4A0E95' : '#4CAF50' }]}>
                                <Text style={styles.statusBadgeText}>{statusData.status}</Text>
                            </View>
                        </View>

                        <View style={styles.routeContainer}>
                            <View style={styles.airportBlock}>
                                <Text style={styles.iataCode}>{statusData.departure.iata}</Text>
                                <Text style={styles.timeLabel}>Dep: {statusData.departure.time}</Text>
                                <Text style={styles.gateLabel}>Gate {statusData.departure.gate} (T{statusData.departure.terminal})</Text>
                            </View>

                            <View style={styles.visualProgress}>
                                <View style={styles.line} />
                                <Icon name="airplane" size={20} color={COLORS.primary} />
                                <View style={styles.line} />
                            </View>

                            <View style={styles.airportBlock}>
                                <Text style={styles.iataCode}>{statusData.arrival.iata}</Text>
                                <Text style={styles.timeLabel}>Arr: {statusData.arrival.time}</Text>
                                <Text style={styles.gateLabel}>Gate {statusData.arrival.gate} (T{statusData.arrival.terminal})</Text>
                            </View>
                        </View>

                        <View style={styles.detailsDivider} />

                        <View style={styles.infoGrid}>
                            <View style={styles.infoItem}>
                                <Icon name="clock-outline" size={18} color="#666" />
                                <Text style={styles.infoValue}>{statusData.delay}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Icon name="airplane-takeoff" size={18} color="#666" />
                                <Text style={styles.infoValue}>{statusData.aircraft}</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Help Text */}
                {!statusData && !loading && (
                    <View style={styles.helpBox}>
                        <Icon name="information-outline" size={30} color="#AAA" />
                        <Text style={styles.helpText}>
                            Track any commercial flight worldwide. Get real-time status,
                            delays, and gate assignments.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    headerTitle: {
        fontFamily: FONTS.semiBold,
        fontSize: 18,
        color: '#3B3B3B',
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    scrollContent: {
        padding: 20,
    },
    searchSection: {
        marginBottom: 25,
    },
    label: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FF',
        borderRadius: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#E8EAF6',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontFamily: FONTS.regular,
        fontSize: 16,
        color: '#3B3B3B',
    },
    checkButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    checkButtonText: {
        color: '#fff',
        fontFamily: FONTS.bold,
        fontSize: 12,
    },
    errorText: {
        color: '#F44336',
        fontSize: 12,
        marginTop: 5,
        fontFamily: FONTS.regular,
    },
    loaderContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    loaderText: {
        marginTop: 15,
        color: '#666',
        fontFamily: FONTS.regular,
    },
    resultCard: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 25,
    },
    airlineName: {
        fontFamily: FONTS.bold,
        fontSize: 18,
        color: '#3B3B3B',
    },
    flightNumber: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: '#848080',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusBadgeText: {
        color: '#FFF',
        fontFamily: FONTS.bold,
        fontSize: 11,
    },
    routeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    airportBlock: {
        alignItems: 'center',
        flex: 1,
    },
    iataCode: {
        fontFamily: FONTS.bold,
        fontSize: 28,
        color: COLORS.primary,
    },
    timeLabel: {
        fontFamily: FONTS.semiBold,
        fontSize: 14,
        color: '#3B3B3B',
        marginTop: 5,
    },
    gateLabel: {
        fontFamily: FONTS.regular,
        fontSize: 11,
        color: '#848080',
    },
    visualProgress: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    line: {
        height: 2,
        backgroundColor: '#E8EAF6',
        flex: 1,
        marginHorizontal: 5,
    },
    detailsDivider: {
        height: 1,
        backgroundColor: '#F5F5F5',
        marginVertical: 15,
    },
    infoGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoValue: {
        fontFamily: FONTS.medium,
        fontSize: 13,
        color: '#444',
        marginLeft: 8,
    },
    helpBox: {
        alignItems: 'center',
        marginTop: 60,
        paddingHorizontal: 40,
    },
    helpText: {
        textAlign: 'center',
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: '#AAA',
        marginTop: 15,
        lineHeight: 20,
    },
});

export default FlightStatusScreen;
