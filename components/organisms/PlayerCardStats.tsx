import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IFetchAllPlayersInASeason, IPlayer, PlayerPlayingPosition } from '@/api/queries/players'
import CardContainer from '../atoms/CardContainer'
import { Image } from 'expo-image';
import DefaultText from '../atoms/DefaultText';
import { cmToFtInchesString, kgToLbs } from '@/utls/convert';
import PairDataText from '../molecules/PairDataText';
import { Team } from '@/api/queries/teams';
import { useTheme } from '@/themes/ThemeProvider';

interface IPlayerCardStats {
	player: IPlayer;
	team: Team[];
	onPress: () => void;
}

const PlayerCardStats: React.FC<IPlayerCardStats> = ({
	player,
	team,
	onPress
}) => {
	const { theme } = useTheme();
	type PlayingPosition = keyof typeof PlayerPlayingPosition;

	return (
		<CardContainer style={{ flexDirection: 'row' }} onPress={onPress}>
			<Image
				source={{ uri: player.image }}
				style={[styles.playerImage]}
				placeholder={require('../../assets/images/placeholder/placeholder-player.png')}
				placeholderContentFit='contain'
			/>
			<View style={[styles.playerDetailsMainContainer]}>
				<DefaultText style={{fontSize: 18, color: theme.card.cardTextDisplayHeader}}>{`${player.last_name}, ${player.first_name}`}</DefaultText>
				<DefaultText style={{fontSize: 14, color: theme.card.cardTextPrimary}} fontWeight={'regularSemiBold'}>{`${PlayerPlayingPosition[player?.playing_position as PlayingPosition || '']}`}</DefaultText>
				<View style={[styles.playerStatusMainContainer]}>
					<PairDataText
						label={'Height: '}
						value={(cmToFtInchesString(player.height || 0))}
						labelStyle={{fontFamily: 'Roboto-Regular', color: theme.card.cardTextAccent}}
						valueStyle={{color: theme.card.cardTextPrimary}}
					/>
					<PairDataText
						label={'Weight: '}
						labelStyle={{fontFamily: 'Roboto-Regular', color: theme.card.cardTextAccent}}
						value={kgToLbs(player.weight || 0)}
						valueStyle={{color: theme.card.cardTextPrimary}}
					/>
				</View>
			</View>
		</CardContainer>
	)
}

export default PlayerCardStats

const styles = StyleSheet.create({
	playerImage: {
		height: 80,
		width: 80,
		alignSelf: 'center'
	},
	playerDetailsMainContainer: {
		marginLeft: 10
	},
	playerStatusMainContainer: {
		marginTop: 10
	}
})