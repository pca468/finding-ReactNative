import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Image } from "react-native-expo-image-cache";
// 창의 높이를 계산합니다.
const WINDOW_HEIGHT = Dimensions.get('window').height;

// 반응형 레이아웃을 위한 상대적 단위
const ITEM_LAYOUT_HEIGHT = WINDOW_HEIGHT * 0.16;
const ITEM_IMAGE_SIZE = ITEM_LAYOUT_HEIGHT * 0.8;
const BORDER_RADIUS = WINDOW_HEIGHT * 0.01;
const FONT_SIZE_HEADER = WINDOW_HEIGHT * 0.03;
const FONT_SIZE_LARGE = WINDOW_HEIGHT * 0.025;
const FONT_SIZE_SMALL = WINDOW_HEIGHT * 0.017;

// PaymentMain 컴포넌트
const PaymentMain = ({ imgURL, itemName, location, date }) => {
  const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };

  return (
    <View style={{ alignSelf: 'flex-start' }}>
      <View style={styles.itemLayout}>
        <Image
          {...preview}
          uri={imgURL ? imgURL.uri : "https://firebasestorage.googleapis.com/v0/b/finding-e15ab.appspot.com/o/images%2FdefaultPost.png?alt=media&token=8e3077f3-62e5-4786-8cc2-729d01d41e8a"}
          style={styles.itemImage}
          onError={(e) => {
            console.log(e.nativeEvent.error);
            console.log(imgURL);
          }}
        />
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{itemName}</Text>
          <Text style={styles.itemDetail}>{`획득지역: ${location}`}</Text>
          <Text style={styles.itemDetail}>{`획득날짜: ${date}`}</Text>
        </View>
      </View>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  itemLayout: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
    height: ITEM_LAYOUT_HEIGHT,
    padding: 15,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  itemImage: {
    width: ITEM_IMAGE_SIZE,
    height: ITEM_IMAGE_SIZE,
    borderRadius: BORDER_RADIUS,
  },
  itemContent: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-evenly',
  },
  itemName: {
    fontSize: FONT_SIZE_LARGE,
    fontWeight: 'bold',
  },
  itemDetail: {
    fontSize: FONT_SIZE_SMALL,
  },
});

export default PaymentMain;
