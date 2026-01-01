import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { travelAPI } from '../services/api';

const HotelResultsScreen = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true);
    const [hotels, setHotels] = useState([]);
    const params = route.params || {};

    useEffect(() => {
        fetchHotels();
    }, [fetchHotels, params]); // Added fetchHotels to satisfy dependency linting

    const fetchHotels = async () => {
        try {
            const results = await travelAPI.searchHotels(params);
            setHotels(results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderHotelItem = ({ item }) => (
        <TouchableOpacity style={styles.hotelCard}>
            <Image source={{ uri: item.image }} style={styles.hotelImage} />
            <View style={styles.cardContent}>
                <View style={styles.headerRow}>
                    <Text style={styles.hotelName}>{item.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Icon name="star" size={14} color="#4A0E95" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                </View>

                <View style={styles.locationRow}>
                    <Icon name="map-marker" size={14} color="#848080" />
                    <Text style={styles.locationText}>{item.location}</Text>
                </View>

                <View style={styles.featuresRow}>
                    {item.amenities.map((amenity, index) => (
                        <Text key={index} style={styles.amenityText}>• {amenity}  </Text>
                    ))}
                </View>

                <View style={styles.footerRow}>
                    <Text style={styles.priceContainer}>
                        <Text style={styles.price}>₹{item.price}</Text>
                        <Text style={styles.nightText}>/night</Text>
                    </Text>
                    <TouchableOpacity style={styles.bookButton}>
                        <Text style={styles.bookButtonText}>Book Now</Text>
                    </TouchableOpacity>
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
                    <Text style={styles.headerTitle}>Hotels in {params.to || 'Destination'}</Text>
                    <Text style={styles.headerSubtitle}>{params.date || '24 Aug'} - {params.returnDate || '25 Aug'}</Text>
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <Icon name="tune" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4A0E95" />
                    <Text style={styles.loadingText}>Finding best hotels...</Text>
                </View>
            ) : (
                <FlatList
                    data={hotels}
                    renderItem={renderHotelItem}
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
    hotelCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 20,
        elevation: 3,
        overflow: 'hidden',
    },
    hotelImage: {
        width: '100%',
        height: 180,
    },
    cardContent: {
        padding: 15,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    hotelName: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#3B3B3B',
        flex: 1,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3E5F5',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    ratingText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        color: '#3B3B3B',
        marginLeft: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    locationText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#848080',
        marginLeft: 5,
    },
    featuresRow: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    amenityText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        color: '#666',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        paddingTop: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    price: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        color: '#4A0E95',
    },
    nightText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#848080',
    },
    bookButton: {
        backgroundColor: '#4A0E95',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    bookButtonText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        color: '#FFF',
    },
});

export default HotelResultsScreen;
