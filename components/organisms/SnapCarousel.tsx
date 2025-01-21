import { Dimensions, ListRenderItem, StyleSheet, Text, View } from 'react-native'
import Carousel, { AdditionalParallaxProps } from 'react-native-snap-carousel';
import React from 'react'

interface ICarouselItem {
	data: any[];
	renderItem: any;
	sliderWidth: number;
	sliderHeight: number;
	itemWidth: number;
}

const SnapCarousel: React.FC<ICarouselItem> = ({
	data,
	renderItem,
	sliderWidth,
	sliderHeight,
	itemWidth
}) => {
	const WINDOWSIZE = Dimensions.get('window').height;
	
	return (
		<Carousel
			data={data || []}
			renderItem={renderItem}
			sliderWidth={sliderWidth}
			sliderHeight={sliderHeight}
			windowSize={WINDOWSIZE}
			style={{backgroundColor: 'red'}}
			itemWidth={itemWidth}
		/>
	)
}

export default SnapCarousel

const styles = StyleSheet.create({})