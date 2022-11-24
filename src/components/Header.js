import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import theme from '../core/theme'

type HeaderProps = {
  fontSize?: number;
  color?: string;
  textAlign?: string;
}

export default function Header(props: HeaderProps) {
  const fontSize = props.fontSize ?? 30;
  const color = props.color ?? theme.colors.onPrimary
  const textAlign = props.textAlign ?? "center";
  return <Text
      style={styles(fontSize,color, textAlign).header} {...props} />
}

const styles = (fontSize, color, textAlign) => StyleSheet.create({
  header: {
    fontSize: fontSize,
    color: color,
    fontWeight: 'bold',
    paddingVertical: 12,
    textAlign: textAlign
  },
})
