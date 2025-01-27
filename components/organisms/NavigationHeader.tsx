import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

interface INavigation {
	onPress?: () => void;
}

const NavigationHeader: React.FC<INavigation> = ({
	onPress
}) => {
	const { height } = Dimensions.get('screen');
	const router = useRouter()
	const insets = useSafeAreaInsets();

	const defaultOnPress = () => {
		router.back()
	}

	return (
		<>
			<Ionicons 
				style={[styles.mainArrow, {top: insets.top + 20, left: 15}]}
				name="arrow-back-outline" 
				size={40} 
				color="red"
				onPress={onPress ?? defaultOnPress}
			/>
		</>
	)
}

export default NavigationHeader

const styles = StyleSheet.create({
	mainArrow: {
		position: 'absolute',
		zIndex: 1,
	}
})