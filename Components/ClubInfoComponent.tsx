import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import FirestoreService from './Firestore/FirestoreService';


interface ClubInfoTagProps {
    clubName: string;
    modalEnabled?: boolean; // Optional, default true
}

const ClubInfoTag: React.FC<ClubInfoTagProps> = ({ clubName, modalEnabled = true }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [clubDetails, setClubDetails] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // Get club detail from Firestore
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


    // Handle clicking the tag
    const handlePress = () => {
        if (modalEnabled) {
            setModalVisible(true);
            fetchClubDetails();
        } else {
            console.log('Tag clicked, modal not enabled.');
        }
    };

    // Render field in modal, can be extended for different fields
    const renderField = (key: string, value: any) => {
        switch (key) {
            case 'Name':
                return null;

            case 'id':
                return (
                    <Text style={styles.infoText} key="Name">
                        <Text style={styles.label}>Name: </Text>
                        {String(value)}
                    </Text>
                );

            default:
                return (
                    <Text style={styles.infoText} key={key}>
                        <Text style={styles.label}>{key}: </Text>
                        {String(value)}
                    </Text>
                );
        }
    };

    const renderModalContent = () => {
        if (loading) {
            return <ActivityIndicator size="small" color="#000" />;
        }

        if (!clubDetails) {
            return <Text>No info available</Text>;
        }

        if (clubDetails.error) {
            return <Text style={[styles.infoText, styles.errorText]}>{clubDetails.error}</Text>;
        }

        // Iterate through all fields
        return (
            <>
                {Object.entries(clubDetails).map(([key, value]) => renderField(key, value))}
            </>
        );
    };

    const renderModal = () => {
        if (!modalEnabled) return null;

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Club Details</Text>

                        {renderModalContent()}

                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tag} onPress={handlePress}>
                <Text style={styles.tagText}>{clubName}</Text>
            </TouchableOpacity>
            {renderModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    tag: {
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 20,
    },
    tagText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '85%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        alignSelf: 'center',
    },
    infoContainer: {
        marginBottom: 10,
    },
    infoText: {
        marginBottom: 5,
        lineHeight: 20,
    },
    errorText: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
    },
    label: {
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#2196F3',
        padding: 10,
        alignSelf: 'center',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
    },
});

export { ClubInfoTag };
