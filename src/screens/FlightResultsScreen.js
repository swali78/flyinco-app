import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { travelAPI } from '../services/api';

const FlightResultsScreen = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true);
    const [flights, setFlights] = useState([]);
    const params = route.params || {};

    useEffect(() => {
        fetchFlights();
    }, [fetchFlights, params]); // Added fetchFlights to satisfy dependency linting

    const fetchFlights = async () => {
        try {
            // Simulate network request using our mock API
            const results = await travelAPI.searchFlights(params);
            setFlights(results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderFlightItem = ({ item }) => (
        <TouchableOpacity
            style={styles.flightCard}
            onPress={() => navigation.navigate('BookingForm', { flight: item })}
        >
            <View style={styles.cardHeader}>
                <View style={styles.airlineInfo}>
                    {item.logo ? <Image source={{ uri: item.logo }} style={{ width: 30, height: 30, marginRight: 10, resizeMode: 'contain' }} /> : null}
                    <Text style={styles.airlineName}>{item.airline}</Text>
                </View>
                <Text style={styles.price}>{item.currency || '₹'}{item.price}</Text>
            </View>

            <View style={styles.routeContainer}>
                <View style={styles.cityInfo}>
                    <Text style={styles.cityCode}>{item.from}</Text>
                    <Text style={styles.time}>{item.depTime}</Text>
                </View>

                <View style={styles.flightPath}>
                    <Text style={styles.duration}>{item.duration}</Text>
                    <View style={styles.pathLine}>
                        <View style={styles.dot} />
                        <View style={styles.line} />
                        <Icon name="airplane" size={20} color="#4A0E95" style={styles.planeIcon} />
                        <View style={styles.line} />
                        <View style={styles.dot} />
                    </View>
                    <Text style={styles.stopInfo}>{item.stops}</Text>
                </View>

                <View style={styles.cityInfo}>
                    <Text style={[styles.cityCode, { textAlign: 'right' }]}>{item.to}</Text>
                    <Text style={[styles.time, { textAlign: 'right' }]}>{item.arrTime}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4A0E95" />
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.headerTitle}>{params.from || 'RUH'}  <Icon name="airplane" size={16} color="#FFFFFF" />  {params.to || 'DXB'}</Text>
                    <Text style={styles.headerSubtitle}>{params.date || '24 Aug, 2024'} • {flights.length} Flights</Text>
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <Icon name="tune" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4A0E95" />
                    <Text style={styles.loadingText}>Searching best flights...</Text>
                </View>
            ) : (
                <FlatList
                    data={flights}
                    renderItem={renderFlightItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            )}
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#4A0E95',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 5,
    },
    headerTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    headerSubtitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontFamily: 'Poppins-Medium',
        color: '#848080',
    },
    listContainer: {
        padding: 20,
    },
    flightCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    airlineName: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: '#3B3B3B',
    },
    price: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#4A0E95',
    },
    routeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cityInfo: {
        flex: 1,
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
    flightPath: {
        flex: 2,
        alignItems: 'center',
    },
    duration: {
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
        color: '#848080',
        marginBottom: 5,
    },
    pathLine: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
    },
    line: {
        height: 1,
        backgroundColor: '#E0E0E0',
        flex: 1,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#4A0E95',
    },
    planeIcon: {
        marginHorizontal: 10,
        transform: [{ rotate: '90deg' }],
    },
    stopInfo: {
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
        color: '#848080',
        marginTop: 5,
    },
});

export default FlightResultsScreen;
