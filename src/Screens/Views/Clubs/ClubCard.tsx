import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import FirestoreService from '../../../Services/FirestoreService';

interface ClubCardProps {
    clubName: string;
}

const ClubCard: React.FC<ClubCardProps> = ({ clubName }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [clubDetails, setClubDetails] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // Fetch club details from Firestore
    const fetchClubDetails = useCallback(async () => {
        setLoading(true);
        try {
            const data = await FirestoreService.getClubInfoByName(clubName);
            if (data && !data.error) {
                setClubDetails(data);
            } else {
                setClubDetails({ error: data.error });
            }
        } catch (error) {
            setClubDetails(error);
        } finally {
            setLoading(false);
        }
    }, [clubName]);

    useEffect(() => {
        fetchClubDetails();
    }, [fetchClubDetails]);

    // Render the content displayed in the card
    const renderCardContent = () => {
        if (loading) {
            return <ActivityIndicator size="small" color="#000" />;
        }
        if (!clubDetails) {
            return <Text>No information available</Text>;
        }

        return (
            <View>
                <Text style={styles.nameText}>{clubDetails.Name || clubName}</Text>

                <Text style={styles.infoText}>
                    <Text style={styles.label}>Category: </Text>
                    {clubDetails.Category || 'N/A'}
                </Text>

                <Text style={styles.infoText}>
                    <Text style={styles.label}>Organization Email: </Text>
                    {clubDetails["Organization Email"] || "N/A"}
                </Text>

                <Text style={styles.infoText}>
                    <Text style={styles.label}>Social Media: </Text>
                    {clubDetails["Social Media"] || "N/A"}
                </Text>

                <Text style={styles.infoText}>
                    <Text style={styles.label}>Status: </Text>
                    {clubDetails.Status || "N/A"}
                </Text>
            </View>
        );

    };

    // Handle card press to show modal
    const handlePress = () => {
        setModalVisible(true);
    };

    // Render an individual field for the modal content
    const renderField = (key: string, value: any) => {
        if (key === 'Name') {
            return null;
        }
        return (
            <Text style={styles.infoText} key={key}>
                <Text style={styles.label}>{key}: </Text>
                {String(value)}
            </Text>
        );
    };

    // Render modal content based on clubDetails
    const renderModalContent = () => {
        if (loading) {
            return <ActivityIndicator size="small" color="#000" />;
        }
        if (!clubDetails) {
            return <Text>No information available</Text>;
        }
        if (clubDetails.error) {
            return <Text style={[styles.infoText, styles.errorText]}>{clubDetails.error}</Text>;
        }
        return (
            <View>
                <Text style={styles.modalNameText}>{clubDetails.Name}</Text>
                {Object.entries(clubDetails).map(([key, value]) => renderField(key, value))}
            </View>
        );
    };

    // Render the modal
    const renderModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <SafeAreaView style={styles.modalContainer}>
                <ScrollView contentContainerStyle={styles.modalContentContainer}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Club Details</Text>
                            {renderModalContent()}
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card} onPress={handlePress}>
                {renderCardContent()}
            </TouchableOpacity>
            {renderModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        margin: 10,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 14,
        marginBottom: 5,
        lineHeight: 20,
    },
    label: {
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalBackground: {
        width: '100%',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        alignSelf: 'center',
    },
    modalNameText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#2196F3',
        padding: 10,
        alignSelf: 'center',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export { ClubCard };
