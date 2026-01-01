/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList,
    StatusBar,
    Modal,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { travelAPI } from '../services/api';
import { COLORS } from '../constants/Theme';

const HomeScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('flights'); // flights | hotels

    // Airport Search State
    const [modalVisible, setModalVisible] = useState(false);
    const [activeField, setActiveField] = useState(null); // 'from' | 'to'
    const [flightStatus, setFlightStatus] = useState(null);
    const [statusLoading, setStatusLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [fromLocation, setFromLocation] = useState({ code: '', city: 'Select Origin' });
    const [toLocation, setToLocation] = useState({ code: '', city: 'Select Destination' });

    const [popularDestinations, setPopularDestinations] = useState([]);

    useEffect(() => {
        const loadDestinations = async () => {
            try {
                const data = await travelAPI.getPopularDestinations();
                setPopularDestinations(data);
            } catch (error) {
                console.error("Failed to load destinations", error);
            }
        };
        loadDestinations();
    }, []);

    const handleCheckStatus = async (airlineCode) => {
        setStatusLoading(true);
        try {
            const data = await travelAPI.getAirlineDelays(airlineCode);
            setFlightStatus(data);
        } catch (error) {
            console.error("Status check failed", error);
        } finally {
            setStatusLoading(false);
        }
    };

    const handleSearch = () => {
        if (!fromLocation.code || !toLocation.code) {
            // You might want to use Alert.alert here, or just open the modal for them
            // For better UX, let's open the missing field
            if (!fromLocation.code) openSearch('from');
            else if (!toLocation.code) openSearch('to');
            return;
        }

        if (activeTab === 'flights') {
            navigation.navigate('FlightResults', {
                from: fromLocation.code,
                to: toLocation.code,
                date: '24 Aug'
            });
        } else {
            navigation.navigate('HotelResults', { to: toLocation.city, date: '24 Aug' });
        }
    };

    // Airport Search Logic
    const openSearch = (field) => {
        setActiveField(field);
        setSearchQuery('');
        setModalVisible(true);
        setSearchResults([]); // Start with empty list
    };

    const handleAirportSearch = async (text) => {
        setSearchQuery(text);
        const results = await travelAPI.searchAirports(text);
        setSearchResults(results);
    };

    const selectAirport = (airport) => {
        if (activeField === 'from') {
            setFromLocation({ code: airport.code, city: airport.city });
        } else {
            setToLocation({ code: airport.code, city: airport.city });
        }
        setModalVisible(false);
    };

    const renderDestinationItem = ({ item }) => (
        <TouchableOpacity
            style={styles.destinationCard}
            onPress={() => {
                setToLocation({ code: '', city: item.name });
                setActiveTab('hotels');
                // Scroll to top to show the change
            }}
        >
            <Image
                source={{ uri: item.image }}
                style={styles.destinationImage}
                resizeMode="cover"
            />
            <View style={styles.destinationInfo}>
                <Text style={styles.destinationName}>{item.name}</Text>
                <Text style={styles.destinationCountry}><Icon name="map-marker" size={12} color="#4A0E95" /> {item.country}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Top Header */}
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../assets/logo.jpg')}
                        style={{ width: 50, height: 50, marginRight: 15, borderRadius: 10 }}
                        resizeMode="contain"
                    />
                    <View>
                        <Text style={styles.greetingText}>Hello, Traveler!</Text>
                        <Text style={styles.headerTitle}>Where do you {'\n'}want to go?</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: 'https://ui-avatars.com/api/?name=Traveler&background=F5DC0C&color=fff' }}
                    />
                </TouchableOpacity>
            </View>

            {/* Search Container */}
            <View style={styles.searchContainer}>
                {/* Tabs */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'flights' && styles.activeTab]}
                        onPress={() => setActiveTab('flights')}
                    >
                        <Icon name="airplane" size={20} color={activeTab === 'flights' ? '#FFF' : '#848080'} />
                        <Text style={[styles.tabText, activeTab === 'flights' && styles.activeTabText]}>Flights</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'hotels' && styles.activeTab]}
                        onPress={() => setActiveTab('hotels')}
                    >
                        <Icon name="office-building" size={20} color={activeTab === 'hotels' ? '#FFF' : '#848080'} />
                        <Text style={[styles.tabText, activeTab === 'hotels' && styles.activeTabText]}>Hotels</Text>
                    </TouchableOpacity>
                </View>

                {/* Inputs */}
                <View style={styles.inputRow}>
                    <TouchableOpacity style={styles.inputWrapper} onPress={() => openSearch('from')}>
                        <Text style={styles.inputLabel}>From</Text>
                        <Text style={[styles.inputValue, !fromLocation.code && { color: '#CCC' }]}>
                            {fromLocation.code ? `${fromLocation.city} (${fromLocation.code})` : 'Select Origin'}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.swapIconContainer}>
                        <Icon name="swap-vertical" size={24} color="#4A0E95" />
                    </View>

                    <TouchableOpacity style={styles.inputWrapper} onPress={() => openSearch('to')}>
                        <Text style={styles.inputLabel}>To</Text>
                        <Text style={[styles.inputValue, !toLocation.code && { color: '#CCC' }]}>
                            {toLocation.code ? `${toLocation.city} (${toLocation.code})` : 'Select Destination'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.dateRow}>
                    <View style={styles.dateWrapper}>
                        <Text style={styles.inputLabel}>Departure</Text>
                        <Text style={styles.dateText}>24 Aug, 2024</Text>
                    </View>
                    <View style={styles.dateWrapper}>
                        <Text style={styles.inputLabel}>Return</Text>
                        <Text style={styles.dateText}>05 Sep, 2024</Text>
                    </View>
                </View>

                <Button
                    title={activeTab === 'flights' ? "Search Flights" : "Search Hotels"}
                    buttonStyle={styles.searchButton}
                    titleStyle={styles.searchButtonText}
                    onPress={handleSearch}
                    iconRight
                    icon={<Icon name="arrow-right" size={20} color="#FFFFFF" style={{ marginLeft: 10 }} />}
                />
            </View>

            {/* Flight Status Tracking (Flightera Integration) */}
            <View style={styles.statusSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Real-time Flight Status</Text>
                    <Icon name="radar" size={20} color={COLORS.primary} />
                </View>

                <View style={styles.statusCard}>
                    <Text style={styles.statusBaitText}>Check delay status for any airline:</Text>
                    <View style={styles.quickStatusContainer}>
                        {['AI', 'EK', 'BA', 'QR'].map((code) => (
                            <TouchableOpacity
                                key={code}
                                style={styles.airlineChip}
                                onPress={() => handleCheckStatus(code)}
                            >
                                <Text style={styles.airlineChipText}>{code}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {statusLoading && <ActivityIndicator color={COLORS.primary} style={{ marginTop: 10 }} />}

                    {flightStatus && !statusLoading && (
                        <View style={styles.statusResult}>
                            <View style={styles.statusBadge}>
                                <Text style={styles.statusBadgeText}>
                                    {flightStatus.airline}: {flightStatus.status || 'On Time'}
                                </Text>
                            </View>
                            <Text style={styles.statusDetailText}>{flightStatus.message || 'No delays expected.'}</Text>
                        </View>
                    )}

                    <TouchableOpacity
                        style={styles.detailedTrackingButton}
                        onPress={() => navigation.navigate('FlightStatus')}
                    >
                        <Text style={styles.detailedTrackingText}>Detailed Tracking by Flight #</Text>
                        <Icon name="chevron-right" size={18} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Popular Destinations */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular Destinations</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                horizontal
                data={popularDestinations}
                renderItem={renderDestinationItem}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.destinationsList}
            />

            {/* Airport Selection Modal */}
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Icon name="close" size={24} color="#3B3B3B" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Select Airport</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    <View style={styles.modalSearchContainer}>
                        <Icon name="magnify" size={20} color="#848080" style={{ marginRight: 10 }} />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Search city or airport code"
                            value={searchQuery}
                            onChangeText={handleAirportSearch}
                            autoFocus
                        />
                    </View>

                    <FlatList
                        data={searchResults}
                        keyExtractor={item => item.code}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.airportItem} onPress={() => selectAirport(item)}>
                                <View style={styles.airportCodeContainer}>
                                    <Text style={styles.airportCode}>{item.code}</Text>
                                </View>
                                <View style={styles.airportInfo}>
                                    <Text style={styles.airportCity}>{item.city}, {item.country}</Text>
                                    <Text style={styles.airportName}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </SafeAreaView>
            </Modal>
        </ScrollView>
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
        paddingTop: 30,
        paddingBottom: 20,
    },
    greetingText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#848080',
    },
    headerTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 26,
        color: '#3B3B3B',
        lineHeight: 32,
    },
    profileButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#fff',
        elevation: 5,
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    searchContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 25,
        borderRadius: 20,
        padding: 20,
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        marginBottom: 30,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        padding: 5,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 12,
    },
    activeTab: {
        backgroundColor: '#4A0E95',
    },
    tabText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        marginLeft: 8,
        color: '#848080',
    },
    activeTabText: {
        color: '#FFF',
    },
    inputRow: {
        marginBottom: 15,
    },
    inputWrapper: {
        backgroundColor: '#FAFAFA',
        padding: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        marginBottom: 10,
    },
    inputLabel: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#848080',
    },
    searchInput: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#3B3B3B',
        padding: 0,
        marginTop: 2,
    },
    inputValue: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#3B3B3B',
        marginTop: 2,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    modalTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: '#3B3B3B',
    },
    modalSearchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        margin: 20,
        paddingHorizontal: 15,
        borderRadius: 12,
        height: 50,
    },
    modalInput: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: '#3B3B3B',
    },
    airportItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    airportCodeContainer: {
        backgroundColor: '#F3E5F5',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        marginRight: 15,
        minWidth: 50,
        alignItems: 'center',
    },
    airportCode: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        color: '#3B3B3B',
    },
    airportInfo: {
        flex: 1,
    },
    airportCity: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#3B3B3B',
    },
    airportName: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#848080',
    },
    swapIconContainer: {
        position: 'absolute',
        right: 20,
        top: 45,
        zIndex: 1,
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 5,
        elevation: 2,
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dateWrapper: {
        flex: 0.48,
        backgroundColor: '#FAFAFA',
        padding: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    statusSection: {
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    statusCard: {
        backgroundColor: '#F8F9FF',
        borderRadius: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#E8EAF6',
    },
    statusBaitText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
    },
    quickStatusContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    airlineChip: {
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#4A0E95',
    },
    airlineChipText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        color: '#4A0E95',
    },
    statusResult: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    statusBadge: {
        backgroundColor: '#4A0E95',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        marginBottom: 5,
    },
    statusBadgeText: {
        color: '#FFF',
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
    },
    statusDetailText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#444',
    },
    detailedTrackingButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    detailedTrackingText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        color: '#4A0E95',
        marginRight: 5,
    },
    dateText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: '#3B3B3B',
        marginTop: 5,
    },
    searchButton: {
        backgroundColor: '#4A0E95',
        borderRadius: 12,
        height: 55,
    },
    searchButtonText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#FFFFFF',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        marginBottom: 15,
    },
    sectionTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: '#3B3B3B',
    },
    seeAllText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#4A0E95',
    },
    destinationsList: {
        paddingLeft: 25,
        paddingRight: 10,
        paddingBottom: 30,
    },
    destinationCard: {
        width: 200,
        height: 250,
        borderRadius: 15,
        marginRight: 15,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        overflow: 'hidden',
    },
    destinationImage: {
        width: '100%',
        height: 180,
        backgroundColor: '#E0E0E0',
    },
    destinationInfo: {
        padding: 12,
    },
    destinationName: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: '#3B3B3B',
    },
    destinationCountry: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#848080',
        marginTop: 2,
    },
});

export default HomeScreen;
