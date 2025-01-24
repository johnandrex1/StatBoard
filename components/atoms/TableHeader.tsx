import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DefaultText from './DefaultText';

export interface ITableHeader {
	headerTitle?: string;
	headerOnPress?: () => void;
	headerIcon?: string;
}

const TableHeader: React.FC<ITableHeader> = ({
	headerTitle = '',
	headerOnPress,
	headerIcon = ''
}) => {
	return (
		<View style={[styles.headerContainer]}>
			<DefaultText>{headerTitle}</DefaultText>
		</View>
	)
}

export default TableHeader

const styles = StyleSheet.create({
	headerContainer: {
		flex: 1,
		alignItems: 'center',
		borderRightWidth: 1,
		borderRightColor: '#fff'
	}
})