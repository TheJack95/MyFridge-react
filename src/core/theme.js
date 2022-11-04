import { DefaultTheme } from 'react-native-paper'
import {Appearance, Dimensions, StyleSheet} from "react-native";

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

const lightTheme = {
  ...DefaultTheme,
  "colors": {
    "primary": "rgb(108, 53, 227)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(233, 221, 255)",
    "onPrimaryContainer": "rgb(34, 0, 93)",
    "secondary": "rgb(98, 91, 113)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(232, 222, 248)",
    "onSecondaryContainer": "rgb(30, 25, 43)",
    "tertiary": "rgb(126, 82, 96)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(255, 217, 227)",
    "onTertiaryContainer": "rgb(49, 16, 29)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(28, 27, 30)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(28, 27, 30)",
    "surfaceVariant": "rgb(231, 224, 236)",
    "onSurfaceVariant": "rgb(73, 69, 78)",
    "outline": "rgb(122, 117, 127)",
    "outlineVariant": "rgb(202, 196, 207)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(49, 48, 51)",
    "inverseOnSurface": "rgb(244, 239, 244)",
    "inversePrimary": "rgb(207, 189, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(248, 241, 254)",
      "level2": "rgb(243, 235, 253)",
      "level3": "rgb(239, 229, 252)",
      "level4": "rgb(237, 227, 252)",
      "level5": "rgb(234, 223, 251)"
    },
    "surfaceDisabled": "rgba(28, 27, 30, 0.12)",
    "onSurfaceDisabled": "rgba(28, 27, 30, 0.38)",
    "backdrop": "rgba(50, 47, 56, 0.4)"
  }
}

const darkTheme = {
  ...DefaultTheme,
  "colors": {
    "primary": "rgb(207, 189, 255)",
    "onPrimary": "rgb(58, 0, 147)",
    "primaryContainer": "rgb(83, 2, 204)",
    "onPrimaryContainer": "rgb(233, 221, 255)",
    "secondary": "rgb(203, 194, 220)",
    "onSecondary": "rgb(51, 45, 65)",
    "secondaryContainer": "rgb(74, 68, 88)",
    "onSecondaryContainer": "rgb(232, 222, 248)",
    "tertiary": "rgb(239, 184, 200)",
    "onTertiary": "rgb(74, 37, 50)",
    "tertiaryContainer": "rgb(99, 59, 73)",
    "onTertiaryContainer": "rgb(255, 217, 227)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(67,64,72)",
    "onBackground": "rgb(230, 225, 230)",
    "surface": "rgb(28, 27, 30)",
    "onSurface": "rgb(230, 225, 230)",
    "surfaceVariant": "rgb(73, 69, 78)",
    "onSurfaceVariant": "rgb(202, 196, 207)",
    "outline": "rgb(148, 143, 153)",
    "outlineVariant": "rgb(73, 69, 78)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(230, 225, 230)",
    "inverseOnSurface": "rgb(49, 48, 51)",
    "inversePrimary": "rgb(108, 53, 227)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(37, 35, 41)",
      "level2": "rgb(42, 40, 48)",
      "level3": "rgb(48, 45, 55)",
      "level4": "rgb(50, 46, 57)",
      "level5": "rgb(53, 50, 62)"
    },
    "surfaceDisabled": "rgba(230, 225, 230, 0.12)",
    "onSurfaceDisabled": "rgba(230, 225, 230, 0.38)",
    "backdrop": "rgba(50, 47, 56, 0.4)"
  }
}

let theme = lightTheme;
const colorScheme = Appearance.getColorScheme();
if (colorScheme === 'dark') {
  theme = darkTheme;
}

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
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

export default theme;