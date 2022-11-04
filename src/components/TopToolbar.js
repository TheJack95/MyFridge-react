import {StatusBar, View} from "react-native";
import theme, {commonStyles} from "../core/theme";
import {Appbar} from "react-native-paper";
import Header from "./Header";
import i18n from "../core/translations";


type TopToolbarProps = {
    title: string;
    leftIcon?: string;
    rightIcon?: string;
    rightIconPress?: () => {};
    leftIconPress?: () => {};
}

export default function TopToolbar(props: TopToolbarProps) {
    const { title, leftIcon, rightIcon, onBackPress,rightIconPress, leftIconPress} = props;
    return (
        <View>
            <StatusBar
                animated={true}
                backgroundColor={theme.colors.primary}
            />
            <View style={commonStyles.logoContainer}>
                <Appbar.Header>
                    { leftIcon === 'back' && <Appbar.BackAction onPress={leftIconPress} />}
                    { leftIcon && leftIcon !== 'back' && <Appbar.Action icon={leftIcon} onPress={leftIconPress}/>}
                    <Appbar.Content title={<Header>{title}</Header>}/>
                    { rightIcon && <Appbar.Action icon={rightIcon} onPress={rightIconPress}/>}
                </Appbar.Header>
            </View>
        </View>
    )
}