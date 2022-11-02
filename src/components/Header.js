import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Header(props) {
  const fontSize = props.fontSize ?? 30;
  const color = props.color ?? theme.colors.light
  return <Text
      style={styles(fontSize,color).header} {...props} />
}

const styles = (fontSize, color) => StyleSheet.create({
  header: {
    fontSize: fontSize,
    color: color,
    fontWeight: 'bold',
    paddingVertical: 12,
    textAlign: "center"
  },
})
