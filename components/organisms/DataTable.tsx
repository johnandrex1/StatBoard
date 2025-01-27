import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, ScrollView, Dimensions, StyleProp, ViewStyle } from 'react-native';
import TableHeader, { ITableHeader } from '../atoms/TableHeader';
import TableData, { ITableData } from '../atoms/TableData';
import { useTheme } from '@/themes/ThemeProvider';
import AntDesign from '@expo/vector-icons/AntDesign';
import DefaultText from '../atoms/DefaultText';
interface TableProps {
	header: ITableHeader[];
	data: ITableData[][];
	tableContainerStyle?: StyleProp<ViewStyle>;
}

const DataTable: React.FC<TableProps> = ({ header, data, tableContainerStyle }) => {
	const { theme } = useTheme();
	const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');
	const [sortedData, setSortedData] = useState<ITableData[][]>(data);

	useEffect(() => {
		setSortedData(data)
	}, [data])
	
	const handleSort = (column: string) => {
		const columnIndex = sortedData[0]?.findIndex((cell) => cell.column === column);
		if (columnIndex === undefined || columnIndex < 0) {
			console.error(`Column '${column}' not found!`);
			return;
		}

		// Determine sorting order and update state
		setSortType((prev) => (prev === 'asc' ? 'desc' : 'asc'));

		// Sort the data based on the column and sort type
		const newSortedData = [...sortedData].sort((a, b) => {
			const aValue = a[columnIndex]?.dataValue || '';
			const bValue = b[columnIndex]?.dataValue || '';
			return sortType === 'asc'
				? aValue.localeCompare(bValue)
				: bValue.localeCompare(aValue);
		});

		setSortedData(newSortedData);
	};

	const renderHeader = () =>
		header.map((headerCell, index) => (
			<TableHeader
				column={headerCell.column}
				key={index}
				headerTitle={headerCell.headerTitle}
				headerIcon={headerCell.headerIcon}
				headerOnPress={() => handleSort(headerCell.column)}
				cellStyle={headerCell.cellStyle}
				sortType={sortType || 'asc'}
			/>
		));

	const renderData = () =>
		sortedData.map((dataRow, dataRowIndex) => (
			<Pressable key={dataRowIndex} style={[styles.tableDataContainer]}>
				{dataRow.map((dataCell, dataCellIndex) => (
					<TableData
						column={dataCell.column}
						key={dataCellIndex}
						dataValue={dataCell.dataValue}
						dataIcon={dataCell.dataIcon}
						dataOnPress={dataCell.dataOnPress}
						cellStyle={dataCell.cellStyle}
					/>
				))}
			</Pressable>
		));

	const EmptyTable = () => (
		<View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
			<AntDesign name="table" size={50} color={theme.table.iconColorAccent}/>
			<DefaultText fontWeight='regularBold' style={{color: theme.table.iconColorAccent, fontSize: 24, marginTop: 10}}>No Data</DefaultText>
		</View>
	)

	return (
		<View style={[styles.mainTable, tableContainerStyle, { backgroundColor: theme.table.background }]}>
			<View style={[styles.tableHeaderContainer]}>{renderHeader()}</View>
			{
				data.length === 0 ?
				<EmptyTable/>
				:
				<ScrollView>
					<View style={[styles.tableDataMainContainer]}>{renderData()}</View>
				</ScrollView>
			}
			{/* <EmptyTable/> */}


		</View>
	);
};

export default DataTable;

const styles = StyleSheet.create({
	mainTable: {
		width: '100%',
	},
	tableHeaderContainer: {
		flexDirection: 'row',
		paddingVertical: 10,
	},
	tableDataMainContainer: {
		flexDirection: 'column',
		width: Dimensions.get('screen').width,
		flex: 1,
	},
	tableDataContainer: {
		flexDirection: 'row',
	},
});
