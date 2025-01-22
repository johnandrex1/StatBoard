import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { useTheme } from '@/utls/ThemeProvider'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface IDefaultContainer {
	children?: ReactNode
}

const DefaultContainer: React.FC<IDefaultContainer> = ({
	children
}) => {
	const { theme } = useTheme();
	const insets = useSafeAreaInsets();
	return (
		<>
			<StatusBar backgroundColor={theme.statusBar.background}/>
			<View style={[
				{ backgroundColor: theme.screen.background, flex: 1 },
				{  
					paddingTop: insets.top,
					paddingLeft: insets.left,
					paddingBottom: insets.bottom,
					paddingRight: insets.right,
				}
			]}>
				{children}
			</View>
		</>
	)
}

export default DefaultContainer

const styles = StyleSheet.create({})