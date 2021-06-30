import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import Background from '../components/Background';
import WhiteLogo from '../components/WhiteLogo';
import {useForm} from '../hooks/useForm';
import {loginStyles} from '../theme/loginTheme';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any>{}

const LoginScreen = ({navigation}:Props) => {

  const {signIn} = useContext(AuthContext)

  const {email,password,form, onChange} = useForm({
    email:'',
    password: ''
  });

  const onLogin = () => {
    console.log({email, password});
    Keyboard.dismiss();

    signIn({correo: email, password})
  };

  return (
    <>
      {/* BAckground */}
      <Background />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>
          {/* Keyboard Avoid Vie */}
          <WhiteLogo />

          <Text style={loginStyles.title}>Login</Text>

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
            onChangeText={(val)=>onChange(val,'email')}
            value={email}
            onSubmitEditing={onLogin}
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
            onChangeText={(val)=>onChange(val,'password')}
            value={password}
            onSubmitEditing={onLogin}
            secureTextEntry
          />

          {/* Button */}
          <View style={loginStyles.buttonWrap}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onLogin}
              style={loginStyles.button}>
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* Crear una nueva cuenta */}
          <View style={loginStyles.newUserWrap}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={loginStyles.buttonText}>Nueva cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
