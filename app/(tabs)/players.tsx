import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DefaultContainer from '@/components/template/DefaultContainer'
import { useAllPlayersInASeason } from '@/api/api-hooks/usePlayerData';
import { IFetchAllPlayersInASeason, IPlayer } from '@/api/queries/players';
import DefaultText from '@/components/atoms/DefaultText';
import PlayerCardStats from '@/components/organisms/PlayerCardStats';
import FullActivityIndicator from '@/components/atoms/FullActivityIndicator';
import { router } from 'expo-router';
import { convertObjToQueryString } from '@/utls/convert';

const Players = () => {
	const [addToList, setAddToList] = useState(10)
	const { data, isInitialLoading, refetch, isRefetching } = useAllPlayersInASeason({ limit: addToList });
	const [players, setPlayers] = useState<IFetchAllPlayersInASeason[]>();
	const [noOfPlayers, setNoOfPlayers] = useState(0);
	const [retryFetch, setRetryFetch] = useState(0)
	const MAXRETRYFETCH = 4;

	const renderPlayer = ({ item }: { item: IFetchAllPlayersInASeason}) => {
		return (
			<PlayerCardStats
				player={item.player}
				team={item.team}
				onPress={() => onPressPlayer(item)}
			/>
		)
	}

	const refetchPlayers = async () => {
		setAddToList((prev) => prev + 10);
		if(retryFetch < MAXRETRYFETCH && !isRefetching) {
			refetch()
			.then(response => {
				if(noOfPlayers === data?.count){
					setRetryFetch(prev => prev + 1)
				}else {
					setRetryFetch(prev => 0)
				}
				setNoOfPlayers(prev => data?.count ? data?.count : 0)
				setPlayers(response.data?.players);
			})
			.catch(err => {
				console.log(err)
			})
		}
	}

	const onPressPlayer = (player: IFetchAllPlayersInASeason) => {
		// router.push(`/stats/player?playerId=${player.player.id}`)
		const routeParams = convertObjToQueryString({
			playerId: player.player.id,
			height: player.player.height,
			weight: player.player.weight,
			birthdate: player.player.date_of_birth
		})
		router.push(`/stats/player?${routeParams}`)
	}

	const ListActivityIndicator = () => (
		isRefetching && (retryFetch < MAXRETRYFETCH) && <ActivityIndicator />
	);

	return (
		<DefaultContainer>
			{
				isInitialLoading ?
				<FullActivityIndicator/>
				:
				<FlatList
					data={data?.players}
					initialNumToRender={10}
					onEndReached={refetchPlayers}
					keyExtractor={(item, index) => index.toString()}
					renderItem={renderPlayer}
					ListFooterComponent={<ListActivityIndicator />}
					onEndReachedThreshold={0.3}
				/>
			}
		</DefaultContainer>
	)
}

export default Players

const styles = StyleSheet.create({})