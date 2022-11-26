import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import theme from '../core/theme'

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        mode="outlined"
        theme={{ colors: { placeholder: theme.colors.primary, text: theme.colors.onBackground } }}
        underlineColorAndroid={theme.colors.primary}
        underlineColor={theme.colors.primary}
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surfaceVariant,
  },
  description: {
    fontSize: 13,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
})
