import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Header(props) {
  const fontSize = props.fontSize ?? 30;
  return <Text style={styles(fontSize).header} {...props} />
}

const styles = (fontSize) => StyleSheet.create({
  header: {
    fontSize: fontSize,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
})
