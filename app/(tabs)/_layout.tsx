import { HapticTab } from '@/components/atoms/HapticTab';
import { IconSymbol } from '@/components/atoms/IconSymbol.ios';
import TabBarBackground from '@/components/atoms/TabBarBackground';
import { useTheme } from '@/themes/ThemeProvider';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
	const { theme } = useTheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: theme.brandColors.brandOrange,
				headerShown: false,
				animation: 'shift',
				tabBarButton: HapticTab,
				tabBarLabelStyle: {fontSize: 11, fontFamily: 'Roboto-SemiBold', marginTop: 5},
				tabBarStyle: {
					...Platform.select({
						ios: {
							position: 'absolute',
							bottom: 0,
							height: 115
						},
						android: {
							height: 65,
						},
						default: {},
					}),
					backgroundColor: theme.tab.backgroundColor,
				}
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Dashboard',
					tabBarIcon: ({ color }) => <Ionicons name="calendar-sharp" size={28} color={color} />
				}}
			/>
			<Tabs.Screen
				name="teams"
				options={{
					title: 'Teams',
					tabBarIcon: ({ color }) => <Ionicons name="basketball-sharp" size={28} color={color} />
				}}
			/>
			<Tabs.Screen
				name="players"
				options={{
					title: 'Players',
					tabBarIcon: ({ color }) => <Ionicons name="people-sharp" size={28} color={color} />
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabBarLabel: {
		fontFamily: 'Roboto-Bold',
	}
})