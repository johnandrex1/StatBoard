import { HapticTab } from '@/components/atoms/HapticTab';
import { IconSymbol } from '@/components/atoms/IconSymbol.ios';
import TabBarBackground from '@/components/atoms/TabBarBackground';
import { useTheme } from '@/utls/ThemeProvider';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, useColorScheme } from 'react-native';

export default function TabLayout() {
	const { theme } = useTheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: theme.statusBar.background,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				animation: 'shift',
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: 'absolute',
					},
					default: {},
				}),
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Dashboard',
					tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="teams"
				options={{
					title: 'Teams',
					tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="players"
				options={{
					title: 'Player',
					tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
				}}
			/>
		</Tabs>
	);
}
