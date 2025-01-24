import { StyleProp, Text, View, ViewStyle, StyleSheet } from 'react-native'
import React from 'react'
import DefaultText from './DefaultText';


export interface ITableData{
	dataValue?: string;
	dataOnPress?: () => void;
	dataIcon?: string;
	cellStyle?: StyleProp<ViewStyle>
}

const TableData: React.FC<ITableData> = ({
	// data
	dataValue,
	dataOnPress,
	dataIcon,
	cellStyle
}) => {
	return (
		<View style={[styles.dataContainer, cellStyle]}>
			<DefaultText>{dataValue}</DefaultText>
		</View>
	)
}

export default TableData

const styles = StyleSheet.create({
	dataContainer: {
		flexDirection: 'row',
	}
})