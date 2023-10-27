import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, Modal, Button } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const CARD_WIDTH = WINDOW_WIDTH * 0.9;
const PROFILE_IMAGE_SIZE = CARD_WIDTH * 0.2;
const TEXT_SIZE_LARGE = CARD_WIDTH * 0.05;
const TEXT_SIZE_MEDIUM = CARD_WIDTH * 0.04;

const DIALOG_WIDTH = WINDOW_WIDTH * 0.8;
const DIALOG_HEIGHT = WINDOW_HEIGHT * 0.6;

const GladMessageDialog = ({ visible, onClose, message, userName, lostArticle, profileImage }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                    <View style={styles.dialog}>
                        <View style={styles.dialogHeader}>
                            <View style={styles.dialogProfileContainer}>
                                <Image
                                    source={ profileImage }
                                    style={styles.dialogProfileImage}
                                />
                                <Text style={styles.dialogUsername}>{userName}</Text>
                            </View>
                            <Button title="X" onPress={() => onClose()} color={'#000000'} />
                        </View>
                        <View style={styles.dialogContent}>
                            <ScrollView>
                                <Text style={styles.dialogItemName}>{lostArticle}</Text>
                                <Text style={styles.dialogMessageText}>{message}</Text>
                            </ScrollView>
                        </View>
                    </View>
                </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    dialog: {
        width: DIALOG_WIDTH,
        height: DIALOG_HEIGHT,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dialogHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
    },
    dialogContent: {
        flex: 6,
    },
    dialogProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dialogProfileImage: {
        width: PROFILE_IMAGE_SIZE,
        height: PROFILE_IMAGE_SIZE,
        borderRadius: PROFILE_IMAGE_SIZE / 2,
        marginRight: 10,
    },
    dialogUsername: {
        fontSize: TEXT_SIZE_LARGE,
        fontWeight: 'bold',
    },
    dialogItemName: {
        fontSize: TEXT_SIZE_LARGE,
        alignSelf: 'flex-start',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    dialogMessageText: {
        fontSize: TEXT_SIZE_MEDIUM,
        alignSelf: 'flex-start',
    }
});

export default GladMessageDialog;
