import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import PaymentMain from './PaymentMain';
import LegalCheckBox from './LegalCheckBox';
import { useNavigation } from '@react-navigation/native';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const FONT_SIZE_HEADER = WINDOW_HEIGHT * 0.03;

const PaymentLegalAgree = () => {
    const navigation = useNavigation();

    const [isChecked1, setChecked1] = useState(false);
    const [isChecked2, setChecked2] = useState(false);
    const [isChecked3, setChecked3] = useState(false);

    const allChecked = isChecked1 && isChecked2 && isChecked3;
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                홍길동 님의 물건이{'\n'}
                <Text style={styles.highlightText}>정말 맞나요?</Text>
            </Text>
            <PaymentMain
                imgURL="https://picsum.photos/id/5/200/200"
                itemName="노트북"
                category="전자기기"
                location="충남 천안시"
                date="2023-10-10"
            />

            <View style={styles.legalSectionContainer}>
                <ScrollView style={styles.legalSection}>
                    <Text>법률 안내사항</Text>
                </ScrollView>
            </View>

            <LegalCheckBox
                label="정말 제 물건이 맞습니다."
                value={isChecked1}
                onChange={setChecked1}
            />
            <LegalCheckBox
                label="법률 안내사항을 모두 숙지하였습니다."
                value={isChecked2}
                onChange={setChecked2}
            />
            <LegalCheckBox
                label="법률을 어겼을 시 처벌을 받을 수 있다는 것을 인지하였습니다."
                value={isChecked3}
                onChange={setChecked3}
            />
            <TouchableOpacity
                style={[styles.findButton, { backgroundColor: allChecked ? '#007bff' : '#cccccc' }]}
                disabled={!allChecked}
                onPress={() => { navigation.navigate("PaymentCheck"); }}
            >
                <Text style={styles.findButtonText}>물건 찾기</Text>
            </TouchableOpacity>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
    },
    headerText: {
        fontSize: FONT_SIZE_HEADER,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 15,
    },
    highlightText: {
        color: '#FF3B3B',
    },
    legalSectionContainer: {
        width: '95%',
        height: WINDOW_HEIGHT * 0.22, // 고정 높이를 설정
        marginBottom: 10, // 필요에 따라 추가
    },
    legalSection: {
        flex: 1, // legalSectionContainer 내에서 가능한 모든 공간을 차지하도록 설정
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        padding: 15,
    },
    findButton: {
        alignSelf: 'flex-end',
        marginTop: 10,
        width: WINDOW_HEIGHT * 0.14,
        height: WINDOW_HEIGHT * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: WINDOW_HEIGHT * 0.01,
    },
    findButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: WINDOW_HEIGHT * 0.022,
    },
});

export default PaymentLegalAgree
