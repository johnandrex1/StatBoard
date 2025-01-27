import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { useTheme } from '@/themes/ThemeProvider'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface IDefaultContainer {
	children?: ReactNode,
	style?: StyleProp<ViewStyle>
}

const DefaultContainer: React.FC<IDefaultContainer> = ({
	children,
	style
}) => {
	const { theme } = useTheme();
	const insets = useSafeAreaInsets();
	return (
		<>
			<StatusBar backgroundColor={theme.statusBar.background}/>
			<View style={[
				style,
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