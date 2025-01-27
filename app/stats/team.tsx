import { Button, FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import DefaultContainer from '@/components/template/DefaultContainer';
import DefaultText from '@/components/atoms/DefaultText';
import { useRouter } from 'expo-router';
import { fetchTeamRoster, fetchTeamSeasonStats, fetchTeamSeasonStatsV2, Team, TeamsRoster, TeamStats } from '@/api/queries/teams';
import { Image } from 'expo-image';
import { useQueries } from '@tanstack/react-query';
import { useTheme } from '@/themes/ThemeProvider';
import Carousel from 'react-native-reanimated-carousel';
import DataTable from '@/components/organisms/DataTable';
import { ITableHeader } from '@/components/atoms/TableHeader';
import { ITableData } from '@/components/atoms/TableData';
import { IPlayer } from '@/api/queries/players';
import CardContainer from '@/components/atoms/CardContainer';
import NavigationHeader from '@/components/organisms/NavigationHeader';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'react-native-svg';
import FullActivityIndicator from '@/components/atoms/FullActivityIndicator';
import { Ionicons } from '@expo/vector-icons';
import StatsFigures from '@/components/molecules/StatsFigures';
import { convertObjToQueryString } from '@/utls/convert';

// interface TeamStatsFigure {
// 	label?: string;
// 	figure?: number;
// 	hasBar?: boolean;
// }

const TeamStatsScreem = () => {
	const { theme, appTheme } = useTheme()
	const router = useRouter()
	const searchParams = useLocalSearchParams(); // This is a URLSearchParams object
	const [teamDetails, setTeamDetails] = useState<Team>();
	const [teamRosterPlayers, setTeamRosterPlayers] = useState<IPlayer[]>([]);
	const [teamRosterPlayerTable, setTeamRosterPlayerTable] = useState<ITableData[][]>([]);
	const [teamStats, setTeamStats] = useState<TeamStats>();
	const [sortType, setSortType] = useState<'asc' | 'dsc'>('asc')
	const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
	const [isLoading, setIsLoading] = useState(false)
	
	const { data: statsData, isLoading: statsLoading } = useQueries({
		queries: [
			{
				queryKey: ['teamSeasonStats'],
				queryFn: () => fetchTeamSeasonStatsV2({
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

	const onPressPlayer = (player: IPlayer) => {
		const routeParams = convertObjToQueryString({
			playerId: player.id,
			height: player.height,
			weight: player.weight,
			birthdate: player.date_of_birth
		})
		router.push(`/stats/player?${routeParams}`)
	}

	useEffect(() => {
		setIsLoading((prev) => true);
		setTeamDetails((prev) => ({
			external_id: statsData?.teamSeasonStats?.team.external_id,
			id: statsData?.teamSeasonStats?.team.id,
			name: statsData?.teamSeasonStats?.team.name,
			team_code: statsData?.teamSeasonStats?.team.team_code,
			team_logo: statsData?.teamSeasonStats?.team.team_logo,
			team_nickname: statsData?.teamSeasonStats?.team.team_nickname
		}))
		setTeamStats(statsData?.teamSeasonStats)
		if (rosterData?.roster) {
			let dataTest: ITableData[][] = []

			rosterData?.roster.map(item => {
				dataTest.push([
					{ column: 'jersey_number', dataValue: `${item.player.jersey_number}`, dataIcon: '', dataOnPress: () => onPressPlayer(item.player), cellStyle: styles.dataCell1Style },
					{ column: 'image', dataValue: '', dataIcon: item.player.image, dataOnPress: () => onPressPlayer(item.player), cellStyle: styles.dataCell2Style },
					{ column: 'name', dataValue: `${item.player.last_name}, ${item.player.first_name}`, dataIcon: '', dataOnPress: () => onPressPlayer(item.player), cellStyle: styles.dataCell3Style },
					{ column: 'playing_position', dataValue: `${item.player.playing_position}`, dataIcon: '', dataOnPress: () => onPressPlayer(item.player), cellStyle: styles.dataCell4Style },
				])
			})
			setTeamRosterPlayerTable(dataTest);
			setTeamRosterPlayers(rosterData?.roster.map(item => (item.player)))
		}
		setTimeout(() => {
			setIsLoading((prev) => false)
		}, 1000);
	}, [rosterData, statsData]);


	const TeamHeaderDetails = () => (
		<View style={{ alignItems: 'center', padding: 20}}>
			<Image
				source={
					teamDetails?.team_logo
						? { uri: teamDetails?.team_logo }
						: (appTheme === 'light') ? require('../../assets/images/placeholder/placeholder-team-lt.png') : require('../../assets/images/placeholder/placeholder-team-dt.png')
 				}
				style={{
					height: 100,
					width: 100,
					borderRadius: 100
				}}
			/>	
			<DefaultText style={{ fontSize: 20, color: theme.screen.textPrimary, marginTop: 15 }} fontWeight='regularBold'>{teamDetails?.name ?? 'No data available'}</DefaultText>
		</View>
	)

	const TeamSeasonDetails = () => (
		<CardContainer cardContainerStyle={{ marginBottom: 20 }}>
			<View style={[styles.teamStatsContainer]}>
				<StatsFigures isLoading={statsLoading} label='Points Avg' figure={teamStats?.points_average} />
				<StatsFigures isLoading={statsLoading} label='Assists Avg' figure={teamStats?.assists_average} />
				<StatsFigures isLoading={statsLoading} label='Rebound Avg' figure={teamStats?.rebounds_average} hasBar={false} />
			</View>
			<View style={[styles.teamStatsContainer]}>
				<StatsFigures isLoading={statsLoading} label='Steals Avg' figure={teamStats?.steals_average} />
				<StatsFigures isLoading={statsLoading} label='Blocks Avg' figure={teamStats?.blocks_average} hasBar={false} />
			</View>
		</CardContainer>
	)

	const tableHeader: ITableHeader[] = [
		{ column: 'jersey_number', headerTitle: 'No#', headerIcon: '', cellStyle: styles.headerCell1Style },
		{ column: 'player_image', headerTitle: '', headerIcon: '', cellStyle: styles.headerCell2Style },
		{ column: 'name', headerTitle: 'Name', headerIcon: '', cellStyle: styles.headerCell3Style },
		{ column: 'playing_position', headerTitle: 'Position', headerIcon: '', cellStyle: styles.headerCell4Style },
	]

	return (
		<DefaultContainer>
			{
				isLoading ? <FullActivityIndicator/> :
				<>
					<NavigationHeader/>
					<TeamHeaderDetails />
					<TeamSeasonDetails />
					<DataTable
						header={tableHeader}
						data={teamRosterPlayerTable}
						tableContainerStyle={styles.tableContainerStyle}
					/>
				</>
			}

		</DefaultContainer>
	)
}

export default TeamStatsScreem

const styles = StyleSheet.create({
	teamDetailsMainContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20
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
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
	},
	tableContainerStyle: {
		flex: 1
	},
	headerCell1Style: {
		flex: .8,
		justifyContent: 'center'
	},
	headerCell2Style: {
		flex: 1,
	},
	headerCell3Style: {
		flex: 2,
	},
	headerCell4Style: {
		flex: 1,
	},
	dataCell1Style: {
		flex: .8,
		marginBottom: 5,
		justifyContent: 'center'
	},
	dataCell2Style: {
		marginBottom: 5,
		flex: 1,
	},
	dataCell3Style: {
		marginBottom: 5,
		flex: 2,
	},
	dataCell4Style: {
		marginBottom: 5,
		flex: 1,
	},
})