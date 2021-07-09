import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={50} color="black" />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
