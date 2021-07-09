import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import Background from '../components/Background';
import WhiteLogo from '../components/WhiteLogo';
import {useForm} from '../hooks/useForm';
import {loginStyles} from '../theme/loginTheme';
import {AuthContext} from '../context/AuthContext';
import {useEffect} from 'react';

interface Props extends StackScreenProps<any, any> {}

const RegisterScreen = ({navigation}: Props) => {
  const {signUp, errorMessage, removeError} = useContext(AuthContext);
  const {name, email, password, onChange} = useForm({
    name: '',
    email: '',
    password: '',
  });

  const onRegister = () => {
    console.log({email, password});
    Keyboard.dismiss();
    signUp({
      nombre: name,
      correo: email,
      password,
    });
  };

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('REgistro incorrecto', errorMessage, [
      {
        text: 'OK',
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  return (
    <>
      {/* BAckground */}
      <Background />

      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#5856d6'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>
          {/* Keyboard Avoid Vie */}
          <WhiteLogo />

          <Text style={loginStyles.title}>Registro</Text>

          <Text style={loginStyles.label}>Nombre: </Text>
          <TextInput
            style={[
              loginStyles.input,
              Platform.OS === 'ios' && loginStyles.inputIos,
            ]}
            placeholder="ingrese su nombre"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            selectionColor="white"
            autoCapitalize="words"
            autoCorrect={false}
            onChangeText={val => onChange(val, 'name')}
            value={name}
            onSubmitEditing={onRegister}
          />

          <Text style={loginStyles.label}>Email: </Text>
          <TextInput
            style={[
              loginStyles.input,
              Platform.OS === 'ios' && loginStyles.inputIos,
            ]}
            placeholder="ingrese su email"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            selectionColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={val => onChange(val, 'email')}
            value={email}
            onSubmitEditing={onRegister}
          />

          <Text style={loginStyles.label}>Contrasenia: </Text>
          <TextInput
            style={[
              loginStyles.input,
              Platform.OS === 'ios' && loginStyles.inputIos,
            ]}
            placeholder="ingrese su contrasenia"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            selectionColor="white"
            onChangeText={val => onChange(val, 'password')}
            value={password}
            onSubmitEditing={onRegister}
            secureTextEntry
          />

          {/* Button */}
          <View style={loginStyles.buttonWrap}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onRegister}
              style={loginStyles.button}>
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* Crear una nueva cuenta */}
          {/* <View style={loginStyles.newUserWrap}> */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.replace('LoginScreen')}
            style={{
              ...loginStyles.buttonReturn,
            }}>
            <Text style={loginStyles.buttonText}>Registrar</Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen;
