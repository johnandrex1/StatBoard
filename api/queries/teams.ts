import { instance } from "../client";
import { IPlayer } from "./players";

// ================================================================
// Get Teams
// ================================================================
export interface IParamsGetTeamByLeague {
	league: 'NBL';
	limit?: number
}

export interface Team {
	external_id?: string;
	id?: string;
	name?: string;
	team_code?: string;
	team_logo?: string | null; // team_logo can be null
	team_nickname?: string;
}

export const fetchTeamByLeague = async ({ league, limit = 10 }: IParamsGetTeamByLeague) => {
	try {
		const response = await instance.get(`/get/${league}/teams`, {
			params: { limit },
		});
		const data: { count: number; data: Team[] } = response.data;
		// Filter out teams with null team_logo
		const filteredTeams = data.data
			.reduce((uniqueTeams, currentTeam) => {
				if (!uniqueTeams.some((team) => team.team_code === currentTeam.team_code)) {
					uniqueTeams.push(currentTeam);
				}
				return uniqueTeams;
			}, [] as Team[]);
		return { count: filteredTeams.length, data: filteredTeams };
	} catch (error) {
		throw error;
	}
}


// ================================================================
// GET Team Season Stats
// ================================================================
export interface IParamsFetchTeamSeasonStats {
	league: 'NBL';
	year: string;
	seasonType?: 'regular' | 'preseason';
	teamCode: any;
}

export interface TeamStats {
	points_average: number;
	assists_average: number;
	rebounds_average: number;
	blocks_average: number;
	steals_average: number;
	period?: string;
	team: Team;
}

export const fetchTeamSeasonStats = async ({ league = 'NBL', year = '2024', seasonType = 'regular', teamCode }: IParamsFetchTeamSeasonStats) => {
	try {
		const response = await instance.get(`/get/${league}/team/stats/for/season/${year}/${seasonType}/team/${teamCode}`);
		const data: { count: number; data: TeamStats[] } = response.data;
		// Filter out teams with null team_logo
		const periodZeroStat = data.data.find((item) => item?.period === "0");
		const filteredTeams = data.data
			.reduce((uniqueTeams, currentTeam) => {
				if (!uniqueTeams.some((team) => team.team.team_code === currentTeam.team.team_code)) {
					uniqueTeams.push(currentTeam);
				}
				return uniqueTeams;
			}, [] as TeamStats[]);
		return { count: filteredTeams.length, data: filteredTeams };
	} catch (error) {
		throw error;
	}
}


export const fetchTeamSeasonStatsV2 = async ({ league = 'NBL', year = '2024', seasonType = 'regular', teamCode }: IParamsFetchTeamSeasonStats) => {
	try {
		const response = await instance.get(`/get/${league}/team/stats/for/season/${year}/${seasonType}/team/${teamCode}`);
		const data: { count: number; data: any[] } = response.data;
		const periodZeroStat = data.data.find((item) => item?.period === "0");

		const teamSeasonStats: TeamStats = {
			points_average: periodZeroStat?.points_average || 0,
			assists_average: periodZeroStat?.assists_average || 0,
			rebounds_average: periodZeroStat?.rebounds_average || 0,
			blocks_average: periodZeroStat?.blocks_average || 0,
			steals_average: periodZeroStat?.steals_average || 0,
			period: periodZeroStat?.period || '0',
			team: {
				external_id: periodZeroStat?.team?.external_id,
				id: periodZeroStat?.team?.id,
				name: periodZeroStat?.team?.name,
				team_code: periodZeroStat?.team?.team_code ||  '',
				team_logo: periodZeroStat?.team?.team_logo,
				team_nickname: periodZeroStat?.team?.team_nickname
			}
		}
		return { teamSeasonStats };
	} catch (error) {
		throw error;
	}
}

// ================================================================
// GET Team Roster
// ================================================================
export interface IParamsFetchTeamRoster {
	league: 'NBL';
	teamId: string;
}

export interface TeamsRoster {
	player: IPlayer;
	team: Team;
}

export const fetchTeamRoster = async ({
	league = 'NBL',
	teamId,
}: IParamsFetchTeamRoster): Promise<{ count: number; roster: TeamsRoster[] }> => {
	try {
		// Make the API call
		const response = await instance.get(`/get/${league}/players/for/team/${teamId}/in/season/2024`, {
			params: {
				limit: 20,
			},
		});

		// Parse the response
		const data: { count: number; data: TeamsRoster[] } = eval(response.data);

		// Extract and filter the player roster
		const roster: TeamsRoster[] = data.data.map((item) => ({
			...item,
		}));
		// Return the count and roster
		return {
			count: roster.length,
			roster,
		};
	} catch (error) {
		console.error('Error fetching team roster:', error);
		throw new Error('Failed to fetch team roster. Please try again.');
	}
};
