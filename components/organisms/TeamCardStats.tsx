import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchTeamSeasonStats, Team, TeamStats } from '@/api/queries/teams'
import CardContainer from '../atoms/CardContainer'
import { Image } from 'expo-image';
import DefaultText from '../atoms/DefaultText';
import { useTeamSeasonStats } from '@/api/api-hooks/useTeamData';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';

const TeamCardStats: React.FC<Team> = ({
	external_id,
	id,
	name,
	team_code,
	team_logo,
	team_nickname
}) => {
	const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<TeamStats>();

	useEffect(() => {
		setIsLoading(true);
		fetchTeamSeasonStats({
			league: 'NBL',
			seasonType: 'regular',
			teamCode: team_code,
			year: '2024'
		})
		.then(response => {
			let apiResp = response.data[0];
			setIsLoading(false);
			setData((prev) => ({
				...prev,
				points_average: apiResp?.points_average ?? '',
				assists_average: apiResp?.assists_average ?? '',
				rebounds_average: apiResp?.rebounds_average ?? '',
				blocks_average: apiResp?.blocks_average ?? '',
				steals_average: apiResp?.steals_average ?? '',
				team: apiResp?.team ?? {}
			}))
		})
		.catch(err => {
			setIsLoading(false);
		})
	}, [])
	

	return (
		<CardContainer key={id} style={[styles.itemItemContainer]}>
			<Image
				source={
					team_logo
						? { uri: team_logo }
						: require('../../assets/images/bteam-placeholder.png') // Replace with your local image path
				}
				style={[styles.teamLogo]}
			/>
			<View style={[styles.itemTextContainer]}>
				<DefaultText style={{ fontSize: 20 }} fontWeight={'headerBold'}>{team_nickname}</DefaultText>
				<DefaultText style={{ fontSize: 14 }} fontWeight='regularRegular'>{name}</DefaultText>
				<View style={{ marginVertical: 8, flexDirection: 'column' }}>
					<DefaultText style={{marginBottom: 5}}>Stats this season</DefaultText>
					<ShimmerPlaceholder visible={!isLoading} style={{borderRadius: 3}}>
						<View style={{flexDirection: 'row'}}>
							<DefaultText style={{ fontSize: 10 }} fontWeight='regularMedium'>Points Avg: </DefaultText>
							<DefaultText style={{ fontSize: 10 }} fontWeight='regularMedium'>{data?.points_average}</DefaultText>
						</View>
					</ShimmerPlaceholder>
					<ShimmerPlaceholder visible={!isLoading} style={{marginVertical: 3, borderRadius: 3}}>
						<View style={{flexDirection: 'row'}}>
							<DefaultText style={{ fontSize: 10 }} fontWeight='regularMedium'>Assist Avg: </DefaultText>
							<DefaultText style={{ fontSize: 10 }} fontWeight='regularMedium'>{data?.assists_average}</DefaultText>
						</View>
					</ShimmerPlaceholder>
					<ShimmerPlaceholder visible={!isLoading} style={{ borderRadius: 3 }}>
						<View style={{flexDirection: 'row'}}>
							<DefaultText style={{ fontSize: 10 }} fontWeight='regularMedium'>Rebound Avg: </DefaultText>
							<DefaultText style={{ fontSize: 10 }} fontWeight='regularMedium'>{data?.rebounds_average}</DefaultText>
						</View>
					</ShimmerPlaceholder>
				</View>
			</View>
		</CardContainer>
	)
}

export default TeamCardStats

const styles = StyleSheet.create({
	teamLogo: {
		height: 80,
		width: 80,
		alignSelf: 'center'
	},
	itemItemContainer: {
		flexDirection: 'row',
	},
	itemTextContainer: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 20
	}
})