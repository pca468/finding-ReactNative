import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DetailMain from './DetailMain';
const LostBoardDetail = ({navigation: {navigate}, route}) => {
    const navigation = useNavigation();

    const findOrLost = "lost"
    const userName = "홍길동"

    // const handleFindPress = () => {
    //     navigation.navigate("PaymentLegalAgree");
    // };

    return (
        <View style={styles.container}>
            <DetailMain
                imgURL={route.params.imgURL}
                itemName={route.params.itemName}
                category={route.params.category}
                location={route.params.location}
                date={route.params.date}
                //onPress={handleFindPress}
                findOrLost={findOrLost}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default LostBoardDetail;