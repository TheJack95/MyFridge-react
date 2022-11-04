import {StatusBar, View} from "react-native";
import theme, {commonStyles} from "../core/theme";
import {Appbar} from "react-native-paper";
import Header from "./Header";
import i18n from "../core/translations";


type TopToolbarProps = {
    title: string;
    leftIcon?: string;
    rightIcon?: string;
    onBackPress?: () => {}
}

export default function TopToolbar(props: TopToolbarProps) {
    const { title, leftIcon, rightIcon, onBackPress } = props;
    return (
        <View>
            <StatusBar
                animated={true}
                backgroundColor={theme.colors.primary}
            />
            <View style={commonStyles.logoContainer}>
                <Appbar.Header>
                    { rightIcon === 'back' && <Appbar.BackAction onPress={onBackPress} />}
                    { rightIcon && rightIcon !== 'back' && <Appbar.Action icon={rightIcon} onPress={() => {}}/>}
                    <Appbar.Content title={<Header>{title}</Header>}/>
                    { leftIcon && <Appbar.Action icon={leftIcon} onPress={() => {}}/>}
                </Appbar.Header>
            </View>
        </View>
    )
}