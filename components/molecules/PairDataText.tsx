import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import DefaultText from '../atoms/DefaultText';

interface IPairDataText {
	label: string;
	value: string;
	labelStyle?: TextStyle;
	valueStyle?: TextStyle;
	containerStyle?: StyleProp<ViewStyle>
}

const PairDataText: React.FC<IPairDataText> = ({
	label,
	value,
	labelStyle,
	valueStyle,
	containerStyle
}) => {
	return (
		<View style={[styles.pairDataContainer, containerStyle]}>
			<DefaultText style={labelStyle}>{label}</DefaultText>
			<DefaultText style={valueStyle}>{value}</DefaultText>
		</View>
	)
}

export default PairDataText

const styles = StyleSheet.create({
	pairDataContainer: {
		flexDirection: 'row'
	}
})