import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Dimensions, Button } from 'react-native';
import DefaultContainer from '@/components/template/DefaultContainer';
import { useRouter } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

const InitialScreen = () => {
	const router = useRouter()

	return (
		<DefaultContainer>
			<Button onPress={() => router.push('/(tabs)')} title='Press me'/>
				
		</DefaultContainer>
	);
};

export default InitialScreen;

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
