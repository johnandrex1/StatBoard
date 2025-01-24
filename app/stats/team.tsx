import { Button, FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import DefaultContainer from '@/components/template/DefaultContainer';
import DefaultText from '@/components/atoms/DefaultText';
import { useRouter } from 'expo-router';
import { fetchTeamRoster, fetchTeamSeasonStats, RosterPlayer, Team, TeamStats } from '@/api/queries/teams';
import { Image } from 'expo-image';
import { useQueries } from '@tanstack/react-query';
import { useTheme } from '@/utls/ThemeProvider';
import Carousel from 'react-native-reanimated-carousel';
import DataTable from '@/components/organisms/DataTable';
import { ITableHeader } from '@/components/atoms/TableHeader';
import { ITableData } from '@/components/atoms/TableData';
import { Cell, Section, TableView } from 'react-native-tableview-simple';

interface TeamStatsFigure {
	label?: string;
	figure?: number;
	hasBar?: boolean;
}

const TeamStatsScreem = () => {
	const { theme } = useTheme()
	const router = useRouter()
	const searchParams = useLocalSearchParams(); // This is a URLSearchParams object
	const [teamDetails, setTeamDetails] = useState<Team>();
	const [teamRosterPlayers, setTeamRosterPlayers] = useState<RosterPlayer[]>([]);
	const [teamRosterPlayerTable, setTeamRosterPlayerTable] = useState<ITableData[][]>([]);
	const [teamStats, setTeamStats] = useState<TeamStats>();
	const { data: statsData, isLoading: statsLoading } = useQueries({
		queries: [
		  {
			queryKey: ['teamSeasonStats'],
			queryFn: () => fetchTeamSeasonStats({ 
			  league: 'NBL',
			  year: '2024',
			  seasonType: 'regular',
			  teamCode: searchParams.teamCode?.toString(), 
			}),
		  },
		],
	  })[0]; // Access the first query result

	const { data: rosterData, isLoading: rosterLoading } = useQueries({
	queries: [
		{
		queryKey: ['teamRoster'],
		queryFn: () => fetchTeamRoster({ 
			league: 'NBL',
			teamId: searchParams.teamId?.toString(), 
		}),
		},
	],
	})[0]; // Access the first query result

	useEffect(() => {
		setTeamDetails(rosterData?.roster[0].team)
		setTeamStats(statsData?.data[0])
		if(rosterData?.roster){
			let dataTest: ITableData[][] = []
			
			rosterData?.roster.map(item => {
				dataTest.push([
					{ dataValue: `${item.player.jersey_number}`, dataIcon: '', dataOnPress: undefined, cellStyle: styles.cell1Style },
					{ dataValue: '', dataIcon: item.player.image, dataOnPress: undefined, cellStyle: styles.cell2Style },
					{ dataValue: `${item.player.last_name}, ${item.player.first_name}`, dataIcon: '', dataOnPress: undefined, cellStyle: styles.cell3Style }, 
					{ dataValue: `${item.player.playing_position}`, dataIcon: '', dataOnPress: undefined, cellStyle: styles.cell4Style },
				])
			})
			console.log('rosterData.roster: ', rosterData.roster)
			setTeamRosterPlayerTable(dataTest);
			setTeamRosterPlayers(rosterData?.roster.map(item => (item.player)))
		}
	}, [rosterData, statsData])
	

	const TeamHeaderDetails = () => (
		<View style={[styles.teamDetailsMainContainer]}>
			<Image
				source={{ uri: teamDetails?.team_logo }}
				style={{
					height: 100,
					width: 100
				}}
			/>
			<View style={[styles.teamDetailsContainer]}>
				<DefaultText style={{ fontSize: 18 }} fontWeight='headerBold'>{teamDetails?.name}</DefaultText>
				<DefaultText style={{ fontSize: 12 }} fontWeight='regularRegular'>{teamDetails?.address}}</DefaultText>
			</View>
		</View>
	)

	const TeamSeasonDetails = () => (
		<View style={[styles.teamStatsMainContainer, {backgroundColor: theme.card.background}]}>
			<DefaultText style={{fontSize: 18, color: theme.card.cardTextPrimary}}>Team Stats</DefaultText>
			<View style={[styles.teamStatsContainer]}>
				<TeamStatsFigures label='Points Avg' figure={teamStats?.points_average}/>
				<TeamStatsFigures label='Assists Avg' figure={teamStats?.assists_average}/>
				<TeamStatsFigures label='Reboind Avg' figure={teamStats?.rebounds_average}/>
				<TeamStatsFigures hasBar={false}/>
			</View>
			<View style={[styles.teamStatsContainer]}>
				<TeamStatsFigures label='Steals Avg' figure={teamStats?.steals_average}/>
				<TeamStatsFigures label='Blocks Avg' figure={teamStats?.blocks_average} hasBar={false}/>
			</View>
		</View>
	)

	const TeamStatsFigures: React.FC<TeamStatsFigure> = ({
		label,
		figure,
		hasBar = true
	}) => (
		<View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
			<View style={{alignItems: 'center', alignSelf: 'center'}}>
				<DefaultText style={{color: theme.card.cardTextPrimary, fontSize: 12, marginBottom: 5}} fontWeight='regularBold'>{label}</DefaultText>
				<DefaultText style={{color: theme.card.cardTextPrimary, fontSize: 20}} fontWeight='regularBold'>{figure}</DefaultText>
			</View>
			{ hasBar && <View style={{ marginLeft: 20, backgroundColor: 'grey' , width: 1.5, height: 40, borderRadius: 9}}/>}
		</View>

	)

	const renderRosterPlayer = ({ item }: { item: RosterPlayer }) => (
		<View style={{backgroundColor: 'red', margin: 10}}>
			<DefaultText>{`${item?.last_name}, ${item?.first_name}`}</DefaultText>
		</View>
	)

	const TeamRoster = () => {
		return (
			<View style={{height: 200}}>
				<FlatList
					data={teamRosterPlayers}
					keyExtractor={(item, index) => index.toString()}
					renderItem={renderRosterPlayer}
					style={{height: '100%'}}
				/>
			</View>
		)
	}


	const renderCarousel = ({ item }) => {
		return (
			<View style={{width: 100, backgroundColor: 'blue'}}>
				<DefaultText>dasdada</DefaultText>
			</View>
		)
	}


	const TestCarousel = () => {
		const defaultDataWith6Colors = [
			"#B0604D",
			"#899F9C",
			"#B3C680",
			"#5C6265",
			"#F5D399",
			"#F1F1F1",
		];
		return (
			<Carousel
				loop={true}
				width={150}
				height={130}
				snapEnabled={true}
				pagingEnabled={true}
				autoPlayInterval={2000}
				data={defaultDataWith6Colors}
				style={{ width: "100%", backgroundColor: 'orange' }}
				renderItem={renderCarousel}
			/>
		)
	}

	const tableHeader: ITableHeader[] = [
		{ headerTitle: 'Number', headerIcon: '', headerOnPress: undefined },
		{ headerTitle: '', headerIcon: '', headerOnPress: undefined },
		{ headerTitle: 'Name', headerIcon: '', headerOnPress: undefined },
		{ headerTitle: 'Position', headerIcon: '', headerOnPress: undefined },
	]
	// const PlugInTableView = () => (
	// 	<TableView>
	// 		<Section>
	// 			<Cell>
	// 				<DefaultText>sdadads</DefaultText>
	// 			</Cell>
	// 			<Cell>
	// 				<DefaultText>sdadads</DefaultText>
	// 			</Cell>
	// 			<Cell>
	// 				<DefaultText>sdadads</DefaultText>
	// 			</Cell>
	// 		</Section>

	// 	</TableView>
	// )

	return (
		<DefaultContainer>
			<TeamHeaderDetails />
			<TeamSeasonDetails/>
			{/* <TestCarousel/>
			<TeamRoster/> */}
			<DataTable
				header={tableHeader}
				data={teamRosterPlayerTable}
			/>
			{/* <PlugInTableView/> */}
			<Button
				title='Press'
				onPress={() => router.back()}
			/>
		</DefaultContainer>
	)
}

export default TeamStatsScreem

const styles = StyleSheet.create({
	teamDetailsMainContainer: {
		flexDirection: 'row',
		backgroundColor: 'red',
		alignItems: 'center',
	},
	teamDetailsContainer: {
		paddingLeft: 20
	},
	teamStatsMainContainer: {
		flexDirection: 'column',
		marginVertical: 20
	},
	teamStatsContainer: {
		flexDirection: 'row',
		marginVertical: 10,
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	cell1Style: {
		backgroundColor: 'red',
		flex: 1
	},
	cell2Style: {
		backgroundColor: 'blue',
		flex: 1,
	},
	cell3Style: {
		backgroundColor: 'yellow',
		flex: 1,
	},
	cell4Style: {
		backgroundColor: 'green',
		flex: 1
	},
})