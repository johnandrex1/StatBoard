import { StyleSheet, FlatList, View, StyleProp, ViewStyle, BackHandler, Switch, Platform } from 'react-native'
import React, { useEffect } from 'react'
import DefaultContainer from '@/components/template/DefaultContainer'
import { useGames } from '@/api/api-hooks/useGameData'
import { IGames } from '@/api/queries/games'
import CardContainer from '@/components/atoms/CardContainer'
import { Image } from 'expo-image'
import DefaultText from '@/components/atoms/DefaultText'
import { useTheme } from '@/themes/ThemeProvider'
import FullActivityIndicator from '@/components/atoms/FullActivityIndicator'
import Fontisto from '@expo/vector-icons/Fontisto';

interface GameTeamDetails {
	type?: 'home' | 'away';
	name?: string;
	logo?: string;
	score?: string;
	style?: StyleProp<ViewStyle>

}


const Dashboard = () => {
	const { theme, appTheme, toggleTheme } = useTheme();
	const { data, isInitialLoading, refetch, isRefetching } = useGames();
	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			() => {
				return true;
			}
		);
		return () => backHandler.remove();
	}, []);
	
	const TeamContainer: React.FC<GameTeamDetails> = ({
		type = 'home',
		name,
		logo,
		score,
		style
	}) => (
		<View style={[styles.teamContainer]}>
			{
				type === 'home' ?
					<>
						<View style={[styles.teamLogoContainer]}>
							<Image
								source={{ uri: logo }}
								style={[styles.teamLogo]}
								placeholder={require('../../assets/images/placeholder/placeholder-team-lt.png')}
								placeholderContentFit='contain'
							/>
						</View>
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<View>
								<DefaultText style={{ fontSize: 12, color: theme.card.cardTextAccent }} fontWeight='regularBold'>{name}</DefaultText>
								<DefaultText style={{ fontSize: 24, textAlign: 'center', color: theme.card.cardTextPrimary }} fontWeight='regularBold'>{score}</DefaultText>
							</View>
						</View>
					</>
					:
					<>
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<View>
								<DefaultText style={{ fontSize: 12, color: theme.card.cardTextAccent }} fontWeight='regularBold'>{name}</DefaultText>
								<DefaultText style={{ fontSize: 24, textAlign: 'center', color: theme.card.cardTextPrimary }} fontWeight='regularBold'>{score}</DefaultText>
							</View>
						</View>
						<View style={[styles.teamLogoContainer]}>
							<Image
								source={{ uri: logo }}
								style={[styles.teamLogo]}
							/>
						</View>
					</>
			}

		</View>
	)
	const renderItem = ({ item }: { item: IGames }) => {
		return (
			<CardContainer>
				<View style={{ alignItems: 'center', marginVertical: 5 }}>
					<DefaultText fontWeight='regularBold' style={{ fontSize: 14, color: theme.brandColors.brandOrange }}>{item.game_status}</DefaultText>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<TeamContainer
						name={item.home_name}
						logo={item.home_team_logo}
						score={item.home_score}
						type='home'
					/>
					<DefaultText style={{ fontSize: 30, color: '#000', marginHorizontal: 20, justifyContent: 'center' }}>{':'}</DefaultText>
					<TeamContainer
						name={item.away_name}
						logo={item.away_team_logo}
						score={item.away_score}
						type='away'
					/>
				</View>
				<View style={{ alignItems: 'center', marginVertical: 5 }}>
					<DefaultText fontWeight='regularBold' style={{ marginBottom: 5, color: theme.card.cardTextPrimary }}>{item.vanue_name}</DefaultText>
					<DefaultText fontWeight='regularBold' style={{ color: theme.card.cardTextPrimary }}>{item.start_time}</DefaultText>
				</View>
			</CardContainer>
		)
	}

	const switchToggleTheme = () => {
		toggleTheme(appTheme === 'light' ? 'dark' : 'light');
	}

	const ToogleTheme = () => (
		<View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10}}>
			<DefaultText fontWeight='regularBold' style={{fontSize: 18, flex: 1, color: theme.themeToggle.label}}>Switch Theme</DefaultText>
			<View style={{alignItems: 'center', flexDirection: 'row'}}>
				<Fontisto name="night-clear" size={24} color={theme.themeToggle.moon} />
				<Switch 
					value={appTheme === 'light'} 
					style={{marginHorizontal: Platform.OS === 'ios' ? 10 : 3}}
					onValueChange={switchToggleTheme}
				/>
				<Fontisto name="day-sunny" size={30} color={theme.themeToggle.sun} />
			</View>
		</View>
	)

	return (
		<DefaultContainer>
			{
				isInitialLoading ?
					<FullActivityIndicator />
					:
					<>
						<ToogleTheme/>
						<FlatList
							data={data?.games}
							renderItem={renderItem}
						/>
					</>

			}

		</DefaultContainer>
	)
}

export default Dashboard

const styles = StyleSheet.create({
	teamContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	teamLogoContainer: {
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	teamLogo: {
		height: 60,
		width: 60,
		borderRadius: 50, // Half of the width or height
		justifyContent: 'center'
	}
})