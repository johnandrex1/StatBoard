import { instance } from "../client";
import { Team } from "./teams";

export interface IFetchAllPlayersInASeason {
    player: IPlayer;
    team: Team[]
}
export interface IPlayer {
	id: string;
	image?: string;
	first_name?: string;
    date_of_birth?: string;
	last_name?: string;
	playing_position?: string;
	height?: number;
	weight?: number;
	jersey_number?: string;
    team: Team[]
}

export interface IPlayerStats {
    assists_average?: number
    blocks_average?: number
    field_goals_attempted_average?: number
    field_goals_made_average?: number
    field_goals_percentage?: number
    fouls_average?: number
    free_throws_attempted_average?: number
    free_throws_made_average?: number
    free_throws_percentage?: number
    games?: number
    minutes_average?: number
    offensive_rebounds?: number
    personal_fouls?: number
    period?: string
    points_average?: number
    rebounds_average?: number
    steals_average?: number
    three_points_attempted_average?: number
    three_points_made_average?: number
    three_points_percentage?: number
    turnovers_average?: number
    two_points_attempted?: number
    two_points_made?: number
    two_points_percentage?: number;
    team_name?: string
    team_logo?: string
    player_name?: string;
    player_image?: string;
    playing_position?: string;
    player_jersey_number?: string;
}

export const PlayerPlayingPosition = {
    "" : "N/A",
    "G" : "Guard",
    "F" : "Forward",
    "C" : "Center",
    "PG" : "Point Guard"    
}

export interface IFetchPlayerStatsInSpecificSeason {
    playerId: string;
}

export interface IPramsFetchAllPlayersInASeason {
    limit?: number
}
export const fetchAllPlayersInASeason = async ({ limit = 10 }: IPramsFetchAllPlayersInASeason) => {
    try {
        // Make the API call
        const response = await instance.get(`/get/NBL/players/in/season/2024`, {
            params: {limit}
        });
        // Parse the response
        const data: { count: number; data: IFetchAllPlayersInASeason[] } = eval(response.data);
        // Extract and filter the player roster
        const players: IFetchAllPlayersInASeason[] = data.data.map((item) => {
            return ({...item })
        });
        // Return the count and roster
        return {
            count: players.length,
            players,
        };
    } catch (error) {
        console.error('Error fetching team roster:', error);
        throw new Error('Failed to fetch team roster. Please try again.');
    }
};

export const fetchPlayerStatsInSpecificSeason = async ({ playerId }: IFetchPlayerStatsInSpecificSeason) => {
    try {
        // Make the API call
        const response = await instance.get(`get/NBL/statistics/for/player/${playerId}/in/season/2024/regular`);

        // Parse the response
        const data: { count: number; data: any[] } = eval(response.data);

        // Filter the data to get the stats for period "0"
        const periodZeroStat = data.data.find((item) => item?.period === "0");

        if (!periodZeroStat) {
            throw new Error('No data found for period "0".');
        }

        // Extract player stats for period "0"
        const playerStat: IPlayerStats = {
            assists_average: periodZeroStat?.assists_average || 0,
            blocks_average: periodZeroStat?.blocks_average || 0,
            field_goals_attempted_average: periodZeroStat?.field_goals_attempted_average || 0,
            field_goals_made_average: periodZeroStat?.field_goals_made_average || 0,
            field_goals_percentage: periodZeroStat?.field_goals_percentage || 0,
            fouls_average: periodZeroStat?.fouls_average || 0,
            free_throws_attempted_average: periodZeroStat?.free_throws_attempted_average || 0,
            free_throws_made_average: periodZeroStat?.free_throws_made_average || 0,
            free_throws_percentage: periodZeroStat?.free_throws_percentage || 0,
            games: periodZeroStat?.games || 0,
            minutes_average: periodZeroStat?.minutes_average || 0,
            offensive_rebounds: periodZeroStat?.offensive_rebounds || 0,
            personal_fouls: periodZeroStat?.personal_fouls || 0,
            period: periodZeroStat?.period || '0',
            points_average: periodZeroStat?.points_average || 0,
            rebounds_average: periodZeroStat?.rebounds_average || 0,
            steals_average: periodZeroStat?.steals_average || 0,
            three_points_attempted_average: periodZeroStat?.three_points_attempted_average || 0,
            three_points_made_average: periodZeroStat?.three_points_made_average || 0,
            three_points_percentage: periodZeroStat?.three_points_percentage || 0,
            turnovers_average: periodZeroStat?.turnovers_average || 0,
            two_points_attempted: periodZeroStat?.two_points_attempted || 0,
            two_points_made: periodZeroStat?.two_points_made || 0,
            two_points_percentage: periodZeroStat?.two_points_percentage || 0,
            team_name: periodZeroStat?.team?.name || '',
            team_logo: periodZeroStat?.team?.team_logo || '',
            player_name: `${periodZeroStat?.player?.first_name}, ${periodZeroStat?.player?.last_name}` || '',
            playing_position: `${periodZeroStat?.player?.playing_position}` || '',
            player_image: periodZeroStat?.player?.image || '',
            player_jersey_number: `#${periodZeroStat?.player?.jersey_number}` || 'N/A',
        };

        // Return the player stats for period "0"
        return { playerStat };
    } catch (error) {
        console.error('Error fetching player stats:', error);
        throw new Error('Failed to fetch player stats. Please try again.');
    }
};