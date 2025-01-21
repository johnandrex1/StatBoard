import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { useTeamByLeague } from '@/api/api-hooks/useTeamData';
import { Team } from '@/api/queries/teams';
import Carousel from 'react-native-snap-carousel';
import DefaultContainer from '@/components/template/DefaultContainer';

const InitialScreen = () => {
	const { data, isLoading, error } = useTeamByLeague({ league: 'NBL' });
	
	const renderItem = ({ item }: { item: Team }) => {
		return (
			<View key={item.id} style={styles.carouselItemContainer}>
				<Image
					style={styles.carouselItemImage}
					source={{
						uri: item.team_logo ?? 'https://images.statsengine.playbyplay.api.geniussports.com/592f89e8bd7fa54fbe87b8b6d071d9faL1.png',
					}}
				/>
				<Text>{item.team_nickname}</Text>
			</View>
		);
	};

	return (
		<DefaultContainer>
			<Text>sad</Text>
			<Carousel
				data={data?.data || []}
				renderItem={renderItem}
				sliderWidth={300}
				sliderHeight={300}
				windowSize={Dimensions.get('window').height}
				style={{ backgroundColor: 'red' }}
				itemWidth={300}
			/>
		</DefaultContainer>
	);
};

export default InitialScreen;

const styles = StyleSheet.create({
	carouselItemContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	carouselItemImage: {
		height: 100,
		width: 100,
		resizeMode: 'contain',
	},
});
