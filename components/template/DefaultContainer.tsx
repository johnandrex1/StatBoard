import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

interface IDefaultContainer {
	children?: ReactNode
}

const DefaultContainer: React.FC<IDefaultContainer> = ({
	children
}) => {
	return (
		<SafeAreaView>
			{children}
		</SafeAreaView>
	)
}

export default DefaultContainer

const styles = StyleSheet.create({})