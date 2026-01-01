import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
    const { user, logout } = useAuth();

    // Modal State
    const [modalVisible, setModalVisible] = React.useState(false);
    const [activeSection, setActiveSection] = React.useState(null); // 'bookings' | 'saved' | 'edit' | 'payment'

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive', onPress: () => logout() }
            ]
        );
    };

    const openSection = (section) => {
        setActiveSection(section);
        setModalVisible(true);
    };

    const renderModalContent = () => {
        switch (activeSection) {
            case 'bookings':
                return (
                    <View>
                        <Text style={styles.modalTitle}>My Bookings</Text>
                        <View style={styles.bookingCard}>
                            <View style={styles.bookingHeader}>
                                <Text style={styles.bookingRef}>Ref: #TRV-8859</Text>
                                <Text style={styles.bookingStatus}>Confirmed</Text>
                            </View>
                            <View style={styles.bookingRoute}>
                                <Text style={styles.routeText}>RUH</Text>
                                <Icon name="airplane" size={20} color="#4A0E95" />
                                <Text style={styles.routeText}>CCJ</Text>
                            </View>
                            <Text style={styles.bookingDate}>24 Aug, 2024 • Air India Express</Text>
                            <Text style={styles.bookingPrice}>₹15,450</Text>
                        </View>
                        <View style={styles.bookingCard}>
                            <View style={styles.bookingHeader}>
                                <Text style={styles.bookingRef}>Ref: #TRV-2210</Text>
                                <Text style={[styles.bookingStatus, { color: '#848080', backgroundColor: '#F5F5F5' }]}>Completed</Text>
                            </View>
                            <View style={styles.bookingRoute}>
                                <Text style={styles.routeText}>DXB</Text>
                                <Icon name="airplane" size={20} color="#848080" />
                                <Text style={styles.routeText}>LHR</Text>
                            </View>
                            <Text style={styles.bookingDate}>10 Jan, 2024 • Emirates</Text>
                            <Text style={styles.bookingPrice}>₹45,200</Text>
                        </View>
                    </View>
                );
            case 'saved':
                return (
                    <View>
                        <Text style={styles.modalTitle}>Saved Places</Text>
                        <View style={styles.savedItem}>
                            <Image source={{ uri: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34' }} style={styles.savedImage} />
                            <View style={styles.savedInfo}>
                                <Text style={styles.savedName}>Paris, France</Text>
                                <Text style={styles.savedPrice}>From ₹65,000</Text>
                            </View>
                            <Icon name="heart" size={24} color="#F44336" />
                        </View>
                        <View style={styles.savedItem}>
                            <Image source={{ uri: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4' }} style={styles.savedImage} />
                            <View style={styles.savedInfo}>
                                <Text style={styles.savedName}>Bali, Indonesia</Text>
                                <Text style={styles.savedPrice}>From ₹35,000</Text>
                            </View>
                            <Icon name="heart" size={24} color="#F44336" />
                        </View>
                    </View>
                );
            case 'edit':
                return (
                    <View>
                        <Text style={styles.modalTitle}>Edit Profile</Text>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Full Name</Text>
                            <View style={styles.inputWrapper}>
                                <Icon name="account-outline" size={20} color="#848080" />
                                <Text style={styles.mockInput}>{user?.name || 'Guest User'}</Text>
                            </View>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Email Address</Text>
                            <View style={styles.inputWrapper}>
                                <Icon name="email-outline" size={20} color="#848080" />
                                <Text style={styles.mockInput}>{user?.email || 'guest@example.com'}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.saveButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                );
            default:
                return <Text>Content not available</Text>;
        }
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4A0E95" />

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Profile</Text>
                <TouchableOpacity style={styles.settingsButton} onPress={() => openSection('edit')}>
                    <Icon name="cog-outline" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.profileSection}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: user?.avatar || 'https://ui-avatars.com/api/?name=User&background=F5DC0C&color=fff' }}
                        style={styles.avatar}
                    />
                    <TouchableOpacity style={styles.editAvatarButton} onPress={() => openSection('edit')}>
                        <Icon name="camera" size={16} color="#3B3B3B" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
                <Text style={styles.userEmail}>{user?.email || 'guest@example.com'}</Text>
            </View>

            <View style={styles.menuSection}>
                <TouchableOpacity style={styles.menuItem} onPress={() => openSection('bookings')}>
                    <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                        <Icon name="ticket-outline" size={22} color="#2196F3" />
                    </View>
                    <Text style={styles.menuText}>My Bookings</Text>
                    <Icon name="chevron-right" size={20} color="#C4C4C4" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => openSection('saved')}>
                    <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
                        <Icon name="heart-outline" size={22} color="#4CAF50" />
                    </View>
                    <Text style={styles.menuText}>Saved Places</Text>
                    <Icon name="chevron-right" size={20} color="#C4C4C4" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
                        <Icon name="credit-card-outline" size={22} color="#FF9800" />
                    </View>
                    <Text style={styles.menuText}>Payment Methods</Text>
                    <Icon name="chevron-right" size={20} color="#C4C4C4" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={[styles.iconContainer, { backgroundColor: '#F3E5F5' }]}>
                        <Icon name="shield-check-outline" size={22} color="#9C27B0" />
                    </View>
                    <Text style={styles.menuText}>Security</Text>
                    <Icon name="chevron-right" size={20} color="#C4C4C4" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                    <View style={[styles.iconContainer, { backgroundColor: '#FFEBEE' }]}>
                        <Icon name="logout" size={22} color="#F44336" />
                    </View>
                    <Text style={[styles.menuText, { color: '#F44336' }]}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* Content Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeaderBar}>
                            <View style={styles.modalHandle} />
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalButton}>
                                <Icon name="close-circle" size={30} color="#EEE" />
                            </TouchableOpacity>
                        </View>
                        {renderModalContent()}
                    </View>
                </View>
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
        backgroundColor: '#4A0E95',
        height: 200,
        paddingTop: 40,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: '#FFF',
        marginTop: 5,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: -60,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#FFF',
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#4A0E95',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    userName: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 22,
        color: '#3B3B3B',
        marginTop: 10,
    },
    userEmail: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#848080',
    },
    menuSection: {
        padding: 20,
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuText: {
        flex: 1,
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: '#3B3B3B',
    },
    // Modal Styles
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        minHeight: '60%',
        maxHeight: '90%',
    },
    modalHeaderBar: {
        alignItems: 'center',
        marginBottom: 20,
    },
    modalHandle: {
        width: 50,
        height: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        marginBottom: 10,
    },
    closeModalButton: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    modalTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#3B3B3B',
        marginBottom: 20,
    },
    // Booking Styles
    bookingCard: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },
    bookingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    bookingRef: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#848080',
    },
    bookingStatus: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        color: '#4CAF50',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 5,
    },
    bookingRoute: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    routeText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#3B3B3B',
        marginHorizontal: 10,
    },
    bookingDate: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#848080',
    },
    bookingPrice: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#4A0E95',
        marginTop: 5,
    },
    // Saved Styles
    savedItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    savedImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    savedInfo: {
        flex: 1,
        marginLeft: 15,
    },
    savedName: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#3B3B3B',
    },
    savedPrice: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#4A0E95',
    },
    // Form Styles
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#848080',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 12,
        padding: 15,
    },
    mockInput: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: '#3B3B3B',
        marginLeft: 10,
    },
    saveButton: {
        backgroundColor: '#4A0E95',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#FFFFFF',
    },
});

export default ProfileScreen;
