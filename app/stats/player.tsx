import { Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import DefaultContainer from '@/components/template/DefaultContainer';
import RadarChart, { DataPoint } from '@/components/organisms/RadarGraph';
import DefaultText from '@/components/atoms/DefaultText';
import { usePlayerStatsInSpecificSeason } from '@/api/api-hooks/usePlayerData';
import { Image } from 'expo-image';
import PairDataText from '@/components/molecules/PairDataText';
import { calculateAge, cmToFtInchesString } from '@/utls/convert';
import StatsFigures from '@/components/molecules/StatsFigures';
import CardContainer from '@/components/atoms/CardContainer';
import { useTheme } from '@/themes/ThemeProvider';
import NavigationHeader from '@/components/organisms/NavigationHeader';
import FullActivityIndicator from '@/components/atoms/FullActivityIndicator';

const PlayerStats = () => {
    const { theme } = useTheme()
    const searchParams = useLocalSearchParams(); // This is a URLSearchParams object
    const { width, height } = Dimensions.get('screen');
    const [isLoading, setIsLoading] = useState(false)
    const routeParams = {
        playerId: searchParams?.playerId.toString() || '',
        height: parseFloat(searchParams?.height.toString() || '0'), 
        weight: parseFloat(searchParams?.weight.toString() || '0'), 
        birthdate: searchParams?.birthdate.toString() || ''
    }
    const { data: playerStatData, isInitialLoading: playerStatIsInitialLoading, refetch: playerStatRefetch, isRefetching: playerStatIsRefetching } = usePlayerStatsInSpecificSeason({ playerId: routeParams.playerId});
    const [statplayerStatData, setStatplayerStatData] = useState<DataPoint[]>([
        { statType: 'PTSAVG', label: 'PTS', value: 0, displayValue: '' },
        { statType: 'ASTAVG', label: 'AST', value: 0, displayValue: '' },
        { statType: 'RPGAVG', label: 'RPG', value: 0, displayValue: '' },
        { statType: 'BLKAVG', label: 'BPG', value: 0, displayValue: '' },
        { statType: 'STLAVG', label: 'STL', value: 0, displayValue: '' },
        { statType: 'FTAVG', label: 'FT%', value: 0, displayValue: '' }
    ])
    
    useEffect(() => {
        if(playerStatData?.playerStat.games !== 0) {
            setStatplayerStatData((prev) => [
                { statType: 'PTSAVG', label: 'PTS', value: playerStatData?.playerStat.points_average ?? 0, displayValue: `${playerStatData?.playerStat.points_average?.toFixed(2).toString() ?? 0 }` },
                { statType: 'ASTAVG', label: 'AST', value: playerStatData?.playerStat.assists_average ?? 0, displayValue: `${playerStatData?.playerStat.assists_average?.toFixed(2).toString() ?? 0 }` },
                { statType: 'RPGAVG', label: 'RPG', value: playerStatData?.playerStat.rebounds_average ?? 0, displayValue: `${playerStatData?.playerStat.rebounds_average?.toFixed(2).toString() ?? 0 }` },
                { statType: 'BLKAVG', label: 'BPG', value: playerStatData?.playerStat.blocks_average ?? 0, displayValue: `${playerStatData?.playerStat.blocks_average?.toFixed(2).toString() ?? 0 }` },
                { statType: 'STLAVG', label: 'STL', value: playerStatData?.playerStat.steals_average ?? 0, displayValue: `${playerStatData?.playerStat.steals_average?.toFixed(2).toString() ?? 0 }` },
                { statType: 'FTAVG', label: 'FT%', value: playerStatData?.playerStat.free_throws_percentage ?? 0, displayValue: `${playerStatData?.playerStat.free_throws_percentage?.toFixed(2).toString() ?? 0 }` }
            ])
        }
    }, [playerStatData])

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading((prev) => false)
        }, 1500);
    }, [])
    

    return (
        <DefaultContainer>
            {
                isLoading ? <FullActivityIndicator/> :
                <>
                    <NavigationHeader/>
                    <CardContainer style={{flexDirection: 'row', paddingRight: 0, marginTop: 70}}>
                        <Image
                            source={{ uri: playerStatData?.playerStat.player_image }}
                            style={{ height: height * 0.25, width: width * 0.3 }}
                            placeholder={require('../../assets/images/placeholder/placeholder-player.png')}
                            placeholderContentFit='contain'
                        />
                        <View style={{flex: 1, paddingRight: 10}}>
                            <DefaultText style={{ fontSize: 24, color: theme.brandColors.brandOrange, marginBottom: 5 }}>{playerStatData?.playerStat.player_name}</DefaultText>  
                            <View style={{ flexDirection: 'row',  alignItems: 'center' }}>
                                <DefaultText style={{ fontSize: 18, color: '#000' }}>{`${playerStatData?.playerStat.player_jersey_number}`}</DefaultText>
                                <View style={{height: 24, width: 1.5, backgroundColor: '#000', marginHorizontal: 8}}/>
                                <DefaultText style={{ fontSize: 18, color: '#000' }}>{playerStatData?.playerStat.playing_position}</DefaultText>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', flex: 1}}>
                                <StatsFigures
                                    labelStyle={{ fontSize: 12 }}
                                    figureStyle={{ fontSize: 14 }}
                                    label='Age'
                                    figure={calculateAge(routeParams.birthdate)}
                                />
                                <StatsFigures
                                    labelStyle={{ fontSize: 12 }}
                                    figureStyle={{ fontSize: 14 }}
                                    label='Height'
                                    figure={cmToFtInchesString(routeParams.height)}
                                />
                                <StatsFigures
                                    labelStyle={{ fontSize: 12 }}
                                    figureStyle={{ fontSize: 14 }}
                                    label='Weight'
                                    figure={`${routeParams.weight} lbs`}
                                    hasBar={false}
                                />
                            </View>
                        </View>
                    </CardContainer>
                        <CardContainer style={{paddingHorizontal: 20}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                                <PairDataText
                                    labelStyle={{ ...styles.keyValue, color: theme.card.cardTextAccent }}
                                    valueStyle={{...styles.keyValue, color: theme.card.cardTextPrimary}}
                                    label='PTS Avg: '
                                    value={playerStatData?.playerStat.points_average}
                                />
                                <PairDataText
                                    labelStyle={{ ...styles.keyValue, color: theme.card.cardTextAccent }}
                                    valueStyle={{...styles.keyValue, color: theme.card.cardTextPrimary}}
                                    label='APG Avg: '
                                    value={playerStatData?.playerStat.assists_average}
                                />
                                <PairDataText
                                    labelStyle={{ ...styles.keyValue, color: theme.card.cardTextAccent }}
                                    valueStyle={{...styles.keyValue, color: theme.card.cardTextPrimary}}
                                    label='RPG Avg: '
                                    value={playerStatData?.playerStat.rebounds_average}
                                />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                                <PairDataText
                                    labelStyle={{ ...styles.keyValue, color: theme.card.cardTextAccent }}
                                    valueStyle={{...styles.keyValue, color: theme.card.cardTextPrimary}}
                                    label='STL Avg: '
                                    value={playerStatData?.playerStat.steals_average}
                                />
                                <PairDataText
                                    labelStyle={{ ...styles.keyValue, color: theme.card.cardTextAccent }}
                                    valueStyle={{...styles.keyValue, color: theme.card.cardTextPrimary}}
                                    label='BLK Avg: '
                                    value={playerStatData?.playerStat.blocks_average}
                                />
                                <PairDataText
                                    labelStyle={{ ...styles.keyValue, color: theme.card.cardTextAccent }}
                                    valueStyle={{...styles.keyValue, color: theme.card.cardTextPrimary}}
                                    label='FT% AVG: '
                                    value={(playerStatData?.playerStat.free_throws_percentage * 100).toFixed(2)}
                                />
                            </View>

                        </CardContainer>
                        <ScrollView>
                            <RadarChart
                                data={statplayerStatData}
                                containerStyle={{ height: 300, marginTop: 3 }}
                            />
                        </ScrollView>
                </>
            }
        </DefaultContainer>
    )
}

export default PlayerStats

const styles = StyleSheet.create({
    playerDetailsMainContainer: {
        flexDirection: 'row',
        padding: 20
    },
    playerStatsContainer: {
        flex: 1
    },
    keyValue: {
        fontFamily: 'Roboto-Bold', 
        fontSize: 13,
    }
})