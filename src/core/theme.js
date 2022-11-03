import { DefaultTheme } from 'react-native-paper'
import {Dimensions, StyleSheet} from "react-native";

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#560CCE',
    secondary: '#414757',
    error: '#cb1331',
    light: '#f6f6f6',
    warning: '#E47F28',
    success: '#7AC439',
  },
}

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logoContainer: {
    paddingTop: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    width: Screen.width,
  },
  content: {
    width: Screen.width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    marginBottom: 56,
  },
  bottomBarContainer: {
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  iconContainer: {
    margin: 20,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
})
