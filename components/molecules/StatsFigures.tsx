import { TextStyle, View } from "react-native";
import DefaultText from "../atoms/DefaultText";
import { LinearGradient } from "react-native-svg";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { useTheme } from "@/themes/ThemeProvider";

interface IStatsFigures {
	label?: string;
	figure?: any;
	hasBar?: boolean;
    isLoading?: boolean
    labelStyle?: TextStyle
    figureStyle?: TextStyle
}

const StatsFigures: React.FC<IStatsFigures> = ({
    label,
    figure,
    hasBar = true,
    isLoading = false,
    labelStyle,
    figureStyle
}) => {
    const { theme } = useTheme();
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
    
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <View style={{ alignItems: 'center', alignSelf: 'center' }}>
                <DefaultText style={{ color: theme.card.cardTextAccent, fontSize: 12, marginBottom: 5, ...labelStyle }} fontWeight='regularBold'>{label}</DefaultText>
                {
                    isLoading ?
                    <ShimmerPlaceholder visible={!isLoading} style={{ height: 35, width: 45, borderRadius: 8 }}/>
                    :
                    <DefaultText style={{ color: theme.card.cardTextPrimary, fontSize: 20, ...figureStyle }} fontWeight='regularBold'>{figure}</DefaultText>
                }
            </View>
            {hasBar && <View style={{ marginLeft: 20, backgroundColor: 'grey', width: 1.5, height: 40, borderRadius: 9 }} />}
        </View>
    )
}

export default StatsFigures;