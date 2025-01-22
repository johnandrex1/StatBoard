import { Dimensions, DimensionValue, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/utls/ThemeProvider';
import { TextProps, TextStyle } from "react-native";

export interface IDefaultText extends TextProps {
    isLoading?: boolean,
    style?: TextStyle,
    children?: string | any | undefined,
    fontWeight?:    'regularThin' | 'regularExtralight' | 'regularLight' | 'regularRegular' | 'regularMedium' | 'regularSemiBold' | 'regularBold' | 'regularExtrabold' | 'regularBlack' |
                    'headerThin' | 'headerExtralight' | 'headerLight' | 'headerRegular' | 'headerMedium' | 'headerSemiBold' | 'headerBold' | 'headerExtrabold' | 'headerBlack' ;
}

const DefaultText: React.FC<IDefaultText> = ({ children, style, fontWeight = 'headerSemiBold', isLoading = false, ...rest }) => {
	const { theme } = useTheme();
	const fontSize = Dimensions.get('screen').height * 0.016;
	const fontMapping: Record<string, string> = {
		regularThin: theme.fonts.regularFontThin,
		regularExtraLight: theme.fonts.regularFontExtraLight,
		regularLight: theme.fonts.regularFontLight,
		regularRegular: theme.fonts.regularFontRegular,
		regularMedium: theme.fonts.regularFontMedium,
		regularSemiBold: theme.fonts.regularFontSemiBold,
		regularBold: theme.fonts.regularFontBold,
		regularExtraBold: theme.fonts.regularFontExtraBold,
		regularBlack: theme.fonts.regularFontBlack,

        headerThin: theme.fonts.headerFontThin,
		headerExtraLight: theme.fonts.headerFontExtraLight,
		headerLight: theme.fonts.headerFontLight,
		headerRegular: theme.fonts.headerFontRegular,
		headerMedium: theme.fonts.headerFontMedium,
		headerSemiBold: theme.fonts.headerFontSemiBold,
		headerBold: theme.fonts.headerFontBold,
		headerExtraBold: theme.fonts.headerFontExtraBold,
		headerBlack: theme.fonts.headerFontBlack,
	};
	
	return (
		<>
			<Text
				style={{
					fontSize: fontSize,
					color: theme.text.primary,
					...style,
					fontFamily: fontMapping[fontWeight],
				}}
			>{children}</Text>
		</>
	)
}

export default DefaultText
