import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

export default function BlurTabBarBackground() {
	return (
		<BlurView
			tint="systemChromeMaterial"
			intensity={200}
			style={{ padding: 20}}
		/>
	);
}

export function useBottomTabOverflow() {
	return 100
}
