import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { useTheme } from '@/themes/ThemeProvider'

interface ICardContainer {
	children?: ReactNode,
	cardContainerStyle?: StyleProp<ViewStyle>;
	style?: StyleProp<ViewStyle>;
	onPress?: () => void;
}

const CardContainer: React.FC<ICardContainer> = ({
	children,
	cardContainerStyle,
	style,
	onPress
}) => {
	const { theme } = useTheme()

	return (
		<View style={[styles.cardSectionContainer, cardContainerStyle]}>
			<Pressable 
				onPress={onPress}
				style={[styles.cardContainer, {backgroundColor: theme.card.background}, style]}
			>
				{children}
			</Pressable>
		</View>
	)
}

export default CardContainer

const styles = StyleSheet.create({
	cardSectionContainer: {
		paddingVertical: 10,
		alignItems: 'center'
	},
	cardContainer: {
		width: '90%',
		padding: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		borderRadius: 8,
		elevation: 7,
	}
})