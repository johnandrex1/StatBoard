import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { useTeamByLeague } from '@/api/api-hooks/useTeamData';
import DefaultContainer from '@/components/template/DefaultContainer';
import { useTheme } from '@/themes/ThemeProvider';
import TeamCardStats from '@/components/organisms/TeamCardStats';
import { Team } from '@/api/queries/teams';
import DefaultText from '@/components/atoms/DefaultText';
import FullActivityIndicator from '@/components/atoms/FullActivityIndicator';

const { width: screenWidth } = Dimensions.get('window');

const TeamScreen = () => {
	const [addToList, setAddToList] = useState(10)
	const { data, isInitialLoading, refetch, isRefetching } = useTeamByLeague({ league: 'NBL', limit: 100 });
	const [teams, setTeams] = useState<Team[]>();
	const [noOfTeams, setNoOfTeams] = useState(0);
	const [retryFetch, setRetryFetch] = useState(0)
	const MAXRETRYFETCH = 4;

	useEffect(() => {
		if (data?.data) {
			setTeams((prev) => [...(prev || []), ...data.data]);
		}	}, 
	[data])

	const refetchTeam = async () => {
		setAddToList((prev) => prev + 10);
		if(retryFetch < MAXRETRYFETCH && !isRefetching) {
			refetch()
			.then(response => {
				if(noOfTeams === data?.count){
					setRetryFetch(prev => prev + 1)
				}else {
					setRetryFetch(prev => 0)
				}
				setNoOfTeams(prev => data?.count ? data?.count : 0)
				setTeams(response.data?.data);
			})
			.catch(err => {
				console.log(err)
			})
		}
	};

	const renderItem = ({ item }: { item: Team }) => {
		return (
			<TeamCardStats
				external_id={item.external_id}
				id={item.id}
				name={item.name}
				team_code={item.team_code}
				team_logo={item.team_logo}
				team_nickname={item.team_nickname}
			/>
		)
	}

	const ListActivityIndicator = () => (
		isRefetching && (retryFetch < MAXRETRYFETCH) && <ActivityIndicator />
	);

	return (
		<DefaultContainer>
			{	isInitialLoading ?
				<FullActivityIndicator/>
				:
				<FlatList
					data={teams}
					renderItem={renderItem}
					keyExtractor={(item, index) => index.toString()}
					onEndReached={refetchTeam}
					ListFooterComponent={<ListActivityIndicator />}
					onEndReachedThreshold={0.1}
				/>
			}
			
		</DefaultContainer>
	);
};

export default TeamScreen;

const styles = StyleSheet.create({
	teamLogo: {
		height: 100,
		width: 100,
	},
	itemItemContainer: {
		flexDirection: 'row',
	},
	itemTextContainer: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: 5,
	},
});
