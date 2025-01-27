import { StyleProp, Text, View, ViewStyle, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import DefaultText from './DefaultText';
import { useTheme } from '@/themes/ThemeProvider';


export interface ITableData {
	column: string;
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
	const { theme } = useTheme()
	return (
		<Pressable style={[styles.dataContainer, cellStyle]} onPress={dataOnPress}>
			<DefaultText fontWeight='regularRegular' style={{color: theme.table.dataColor}}>{dataValue}</DefaultText>
		</Pressable>
	)
}

export default TableData

const styles = StyleSheet.create({
	dataContainer: {
		flexDirection: 'row',
	}
})