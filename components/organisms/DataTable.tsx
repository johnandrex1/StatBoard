import { Pressable, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import TableHeader, { ITableHeader } from '../atoms/TableHeader';
import TableData, { ITableData } from '../atoms/TableData';

interface TableProps {
	header: ITableHeader[];
	data: ITableData[][];
}

const DataTable: React.FC<TableProps>= ({
	header,
	data
}) => {
	const renderHeader = () => {
		return header.map((header, index) => (
			<TableHeader
				key={index}
				headerTitle={header.headerTitle}
				headerIcon={header.headerIcon}
				headerOnPress={header.headerOnPress}
			/>
		))
	}
	const renderData = () => {
		return data.map((dataRow, dataRowIndex) => (
			<Pressable key={dataRowIndex} style={[styles.tableDataContainer]}>
				{(
					dataRow.map((dataCell, dataCellIndex) => (
						<TableData
							key={dataCellIndex}
							dataValue={dataCell.dataValue}
							dataIcon={dataCell.dataIcon}
							dataOnPress={dataCell.dataOnPress}
							cellStyle={dataCell.cellStyle}
						/>
					))
				)}
			</Pressable>

		))
	}
	return (
		<View style={[styles.mainTable]}>
			<View style={[styles.tableHeaderContainer]}>
				{renderHeader()}
			</View>
			<ScrollView horizontal>
				<ScrollView>
					<View style={[styles.tableDataMainContainer]}>
						{renderData()}
					</View>
				</ScrollView>
			</ScrollView>
		</View>
	)
}

export default DataTable

const styles = StyleSheet.create({
	mainTable: {
		width: '100%',
		height: 300,
	},
	tableHeaderContainer: {
		flexDirection: 'row'
	},
	tableDataMainContainer: {
		flexDirection: 'column',
		width: Dimensions.get('screen').width,
		flex: 1
	},
	tableDataContainer: {
		flexDirection: 'row',
	}
})