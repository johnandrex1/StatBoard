import { instance } from "../client";

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
	team: Team;
}

export const fetchTeamSeasonStats = async ({ league = 'NBL', year = '2024', seasonType = 'regular', teamCode }: IParamsFetchTeamSeasonStats) => {
	try {
		const response = await instance.get(`/get/${league}/team/stats/for/season/${year}/${seasonType}/team/${teamCode}`);
		const data: { count: number; data: TeamStats[] } = response.data;

		// Filter out teams with null team_logo
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

// ================================================================
// GET Team Roster
// ================================================================
export interface IParamsFetchTeamRoster {
	league: 'NBL';
	teamId: string;
}

export interface TeamsRoster {
	player: RosterPlayer;
	team: Team;
}

export interface RosterPlayer {
	id: string;
	image?: string;
	first_name?: string;
	last_name?: string;
	playing_position?: string;
	height?: number;
	weight?: number;
	jersey_number?: string;
}

export const fetchTeamRoster = async ({
	league = 'NBL',
	teamId,
}: IParamsFetchTeamRoster): Promise<{ count: number; roster: TeamsRoster[] }> => {
	try {
		// Make the API call
		const response = await instance.get(`/get/${league}/players/for/team/${teamId}`, {
			params: {
				limit: 12,
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
