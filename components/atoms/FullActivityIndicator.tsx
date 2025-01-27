import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native'
import { useTheme } from '@/themes/ThemeProvider'
import DefaultText from './DefaultText'

const FullActivityIndicator = () => {
	const { appTheme } = useTheme();
	const animation = useRef<LottieView>(null);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
			<LottieView
				ref={animation}
				autoPlay
				style={{
					width: 200,
					height: 200,
				}}
				source={(appTheme === 'light') ? require('../../assets/animations/BBallActivityIndicatorLT.json') : require('../../assets/animations/BBallActivityIndicatorDT.json')}
			/>
			<DefaultText style={{fontSize: 24, alignSelf: 'center'}}>Loading ...</DefaultText>
		</View>

	)
}

export default FullActivityIndicator

const styles = StyleSheet.create({})