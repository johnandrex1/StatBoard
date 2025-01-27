import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import Svg, { Polygon, Circle, Text, Rect } from 'react-native-svg';
import LinearGradient from 'expo-linear-gradient';
import { useTheme } from '@/themes/ThemeProvider';
import DefaultText from '../atoms/DefaultText';
import { statToCoordinatesGraph } from '@/utls/convert';

export interface DataPoint {
	statType: string;
	label: string;
	value: number;
	displayValue: string;
}

interface Props {
	data: DataPoint[];
	radius?: number;
	containerStyle?: ViewStyle;
}

const { width, height } = Dimensions.get('window');

const RadarChart: React.FC<Props> = ({ data, radius = Math.min(width, height) * 0.3, containerStyle }) => {
	const  { theme } = useTheme()
	const [togglePoint, setTogglePoint] = useState('all');
	const highestValueObject = data.reduce((prev, current) => 
		current.value > prev.value ? current : prev
	);
	
	const centerX = width / 2;
	const centerY = height / 2;
	const numSides = data.length;
	const angleStep = (Math.PI * 2) / numSides;

	const getCoordinates = (value: number, index: number, displayValue: string, statType?: string ): { x: number; y: number, displayValue: string, statType?: string } => {
		const angle = index * angleStep - Math.PI / 2;
		const x = centerX + radius * value * Math.cos(angle);
		const y = centerY + radius * value * Math.sin(angle);
		return { x, y, displayValue, statType };
	};

	const points = data.map((d, index) => {
		const scaledValue = statToCoordinatesGraph(d.statType, d.value);
		return getCoordinates(scaledValue, index, d.displayValue, d.statType);
	});

	const insidePoints = data.map((d, index) => {
		const value = 70 / 70;
		return getCoordinates(value, index, '');
	});

	const insidePoint2 = data.map((d, index) => {
		const value = 70 / 100;
		return getCoordinates(value, index, '');
	});

	const insidePoint3 = data.map((d, index) => {
		const value = 70 / 150;
		return getCoordinates(value, index, '');
	});

	const onPressStat = (statType: string) => {
		setTogglePoint((prev) => prev === statType ? 'all' : statType)
	}


	return (
		<View style={[styles.container, containerStyle]}>
			<Svg width={width} height={height}>
				{/* for the inside polygon */}
				<Polygon
					points={insidePoints.map((point) => `${point.x},${point.y}`).join(' ')}
					fill="rgba(246, 139, 31, 0.1)"
					strokeWidth={0}
				/>
				<Polygon
					points={insidePoint2.map((point) => `${point.x},${point.y}`).join(' ')}
					fill="rgba(246, 139, 31, 0.2)"
					strokeWidth={0}
				/>
				<Polygon
					points={insidePoint3.map((point) => `${point.x},${point.y}`).join(' ')}
					fill="rgba(246, 139, 31, 0.3))"
					strokeWidth={0}
				/>
				<Polygon
					points={points.map((point) => `${point.x},${point.y}`).join(' ')}
					fill="rgba(122, 122, 122, 0.4)"
					stroke={'#F68B1F'}
					strokeWidth={0}
				/>
				{points.map((point, index) => (
					<React.Fragment key={index}>
						{/* Circle */}
						<Circle cx={point.x} cy={point.y} r={5} fill={theme.brandColors.brandOrange} />
						{/* Box for the value */}
						{
							togglePoint === 'all' || togglePoint === point.statType ?
							<>
								<Rect
									x={point.x + 10}
									y={point.y - 10}
									width={35}
									height={20}
									fill={theme.brandColors.brandBlack}
									strokeWidth={1}
									rx={5}
								/>
								{/* Text to display value */}
								<Text
									x={point.x + 28}
									y={point.y + 5}
									fill={theme.brandColors.brandOrange}
									fontSize={12}
									textAnchor="middle"
									fontFamily='Roboto-Bold'
								>
									{point.displayValue}
								</Text>
							</>
							: null
						}

					</React.Fragment>
				))}
				{data.map((d, index) => {
					const { x, y } = getCoordinates(1, index, '');
					const angle = index * angleStep - Math.PI / 2;
					const labelOffset = radius * -0.0009;
					const textX = x + labelOffset * Math.cos(angle);
					const textY = y + labelOffset * Math.sin(angle);
					const textAnchor = angle > -Math.PI / 2 && angle < Math.PI / 2 ? 'start' : 'end';
					return (
						<React.Fragment key={index}>
							<Rect
								x={textX - 30}
								y={textY - 20}
								width={40}
								height={30}
								fill={'transparent'}
								strokeWidth={1}
								onPress={() => onPressStat(d.statType)}
								rx={5}
							/>
							<Text
								key={index}
								x={textX}
								y={textY+ 2}
								fontSize={12}
								fill={theme.radarGraph.label}
								textAnchor={textAnchor}
								fontFamily='Roboto-Bold'
								onPress={() => onPressStat(d.statType)}
							>
								{d.label}
							</Text>
						</React.Fragment>
	
					);
				})}
			</Svg>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default RadarChart;