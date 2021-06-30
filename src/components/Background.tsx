import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Background = () => {
  return (
    <View
      style={styles.bkg}
    />
  )
}

export default Background

const styles = StyleSheet.create({
  bkg : {
    position: 'absolute',
    backgroundColor: '#5856d6',
    top: -530,
    width: 1000,
    height: 1200,
    transform:[
      {rotate: '-70deg'}
    ]
  },
})
