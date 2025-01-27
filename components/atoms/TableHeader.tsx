import { StyleSheet, Text, View, StyleProp, ViewStyle, Pressable } from 'react-native'
import React from 'react'
import DefaultText from './DefaultText';
import { useTheme } from '@/themes/ThemeProvider';
import Octicons from '@expo/vector-icons/Octicons';

export interface ITableHeader {
	column: string
	headerTitle?: string;
	headerOnPress?: any;
	headerIcon?: string;
	cellStyle?: StyleProp<ViewStyle>
	sortType?: 'asc' | 'desc'
}

const TableHeader: React.FC<ITableHeader> = ({
	headerTitle = '',
	headerOnPress,
	headerIcon = '',
	cellStyle,
	sortType = 'asc'
}) => {
	const { theme } = useTheme();
	return (
		<Pressable style={[styles.headerContainer, cellStyle]} onPress={() => headerOnPress()}>
			<DefaultText fontWeight='regularBold' style={{color: theme.table.headerColor,}}>{headerTitle}</DefaultText>
			{
				headerTitle && (sortType === 'asc' ? <Octicons name='sort-asc' size={15} color="green" style={{marginLeft: 5}}/> : <Octicons name='sort-desc' size={15} color="green" style={{marginLeft: 5}}/>)
			}
		</Pressable>
	)
}

export default TableHeader

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
	}
})