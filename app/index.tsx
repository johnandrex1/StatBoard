import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import DefaultContainer from '@/components/template/DefaultContainer';
import { useRouter } from 'expo-router';
import DefaultText from '@/components/atoms/DefaultText';
import { Image } from 'expo-image';
import { useTheme } from '@/themes/ThemeProvider';
import * as SplashScreen from 'expo-splash-screen';

const { width: screenWidth } = Dimensions.get('window');

const InitialScreen = () => {
	const router = useRouter();
	const { theme, appTheme } = useTheme();
	const { height, width } = Dimensions.get('screen');

	useEffect(() => {
		setTimeout(() => {
			router.push('/(tabs)')
		}, 2000);
	}, [])
	
	
	return (
		<View style={{backgroundColor: theme.intro.background, flex: 1, justifyContent: 'center'}}>
			<Image
				source={(appTheme === 'light') ? require('../assets/images/brand/brand-intro-image-lt.png') : require('../assets/images/brand/brand-intro-image-dt.png')}
				style={{height: height * 0.65, width: width }}
				cachePolicy='none'
			/>
		</View>
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
