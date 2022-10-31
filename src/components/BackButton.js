import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function BackButton({ navigation }) {

  const onGoBackPress = () => {
    navigation.goBack()
  }
  return (
    <TouchableOpacity onPress={onGoBackPress} style={styles.container}>
      <Ionicons name="arrow-back" size={30} color="black" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  }
})
