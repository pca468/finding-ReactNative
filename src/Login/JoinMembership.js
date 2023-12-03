import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme, } from 'react-native-paper';

import { auth } from '../../FireBase/DB';
import { app } from '../../FireBase/DB';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';

const WINDOW_HEIGHT = Dimensions.get('window').height;

export default function JoinMembership({ navigation }) {
  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: '#007bff',
    },
  };

  // 사용자 입력값
  const [email, setEmail] = useState('');   // 이메일
  const [password, setPassword] = useState('');   // 비밀번호
  const [confirmPassword, setConfirmPassword] = useState('');   // 비밀번호 확인
  const [phoneNumber, setPhoneNumber] = useState('');   // 전화번호
  const [error, setError] = useState(null);   // 에러 메시지 


  const [isVerificated, setIsVerificated] = useState(false);

  const recaptchaVerifier = React.useRef(null);
  const firebaseConfig = app ? app.options : undefined;

  const [message, showMessage] = React.useState();
  const attemptInvisibleVerification = false;

  const [isSend, setIsSend] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  // 인증 코드 전송 함수
  const sendVerificationCode = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        "+82" + phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      Alert.alert('인증번호 전송 성공');
    } catch (err) {
      Alert.alert('인증번호 전송 실패: ' + err);
    }

  };

  // 인증 코드 확인 함수
  const verifyPhoneNumber = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);

      navigation.navigate("Join Membership Second", {
        email: email,
        password: password,
        phoneNumber: phoneNumber,
      });
    } catch (err) {
      Alert.alert('인증 실패: ' + err);
    }
  };


  // 전화번호 인증 임시 코드
  const handleVerification = () => {
    if (!isSend) {
      sendVerificationCode();
      setIsSend(true);
    } else {
      Alert.alert("인증코드는 한번만 보낼 수 있습니다.")
    }
  };



  // 정보 입력 완료 함수 (아이디 길이 말고 이메일 형식 지키라고 경고하도록 수정 필요)
  const handleSignup = () => {
    let newError = '';
    if (!email || !password || !confirmPassword) {
      newError = '입력이 안된 값이 있습니다.';
    }
    else if (email.length < 6 || password.length < 6) {
      newError = '아이디와 비밀번호는 8자 이상이어야 합니다.';
    } else if (email.length > 30 || password.length > 30) {
      newError = '아이디와 비밀번호는 30자 이하여야 합니다.';
    } else if (password !== confirmPassword) {
      newError = '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
    } else {
      verifyPhoneNumber();

    }

    setError(newError);
  };

  return (
    <>

      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          {/* 아이디 입력 */}
          <View style={{ width: '100%' }}>
            <View style={styles.textInputBox}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textInputName}>이메일</Text>
                <Text style={{ color: '#ff0000', fontWeight: 'bold' }}>*</Text>
              </View>
              <TextInput style={styles.input}
                mode="outlined"
                value={email}
                placeholder="이메일 입력"
                theme={theme}
                placeholderTextColor={'#BDBDBD'}
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
              />
            </View>


            {/* 비밀번호 입력 */}
            <View style={styles.textInputBox}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textInputName}>비밀번호</Text>
                <Text style={{ color: '#ff0000', fontWeight: 'bold' }}>*</Text>
              </View>
              <TextInput style={styles.input}
                mode="outlined"
                value={password}
                placeholder="비밀번호 입력"
                theme={theme}
                placeholderTextColor={'#BDBDBD'}
                secureTextEntry={true}
                autoCorrect={false}
                onChangeText={(text) => setPassword(text)}
              />

              {/* 비밀번호 재확인 입력 */}
              <TextInput style={styles.input}
                mode="outlined"
                value={confirmPassword}
                placeholder="비밀번호 확인"
                theme={theme}
                placeholderTextColor={'#BDBDBD'}
                secureTextEntry={true}
                autoCorrect={false}
                onChangeText={(text) => setConfirmPassword(text)}
              />
            </View>


            {/*전화번호 입력 및 인증*/}
            <View style={styles.textInputBox}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textInputName}>전화번호</Text>
                <Text style={{ color: '#ff0000', fontWeight: 'bold' }}>*</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                  mode="outlined"
                  style={[styles.input, { width: '65%' }]}
                  value={phoneNumber}
                  placeholder="휴대전화번호 입력"
                  placeholderTextColor={'#BDBDBD'}
                  theme={theme}
                  keyboardType="phone-pad"
                  onChangeText={(text) => setPhoneNumber(text)}
                />
                <TouchableOpacity style={styles.verifyButton} onPress={handleVerification}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>인증번호 발송</Text>
                </TouchableOpacity>
              </View>
              <TextInput style={styles.input}
                mode="outlined"
                value={verificationCode}
                placeholder="인증번호"
                theme={theme}
                placeholderTextColor={'#BDBDBD'}
                secureTextEntry={true}
                autoCorrect={false}
                onChangeText={(text) => setVerificationCode(text)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>


        {/* 경고 메세지 및 회원가입 버튼 */}
        <View style={{ width: '100%' }}>
          {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignup}
          >
            <Text style={[styles.signupText]}>가입하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 50,
  },
  textInputBox: {
    width: '100%',
    marginBottom: 15,
  },
  textInputName: {
    fontSize: WINDOW_HEIGHT * 0.022,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    backgroundColor: "#fff",
    height: WINDOW_HEIGHT * 0.06,
    marginBottom: 5,
  },
  verifyButton: {
    width: '33%',
    height: WINDOW_HEIGHT * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  signupButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginTop: 5,
  },
  signupText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: WINDOW_HEIGHT * 0.02,
  },
});