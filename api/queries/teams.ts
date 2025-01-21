import { instance } from "../client";

export interface IParamsGetTeamByLeague {
	league: 'NBL';
}

export interface Team {
	external_id: string;
	id: string;
	name: string;
	team_code: string;
	team_logo: string | null; // team_logo can be null
	team_nickname: string;
}

export const fetchTeamByLeague = async ({ league }: IParamsGetTeamByLeague) => {
	console.log('TRYE')
	try {
		const response = await instance.get(`/get/${league}/teams`);
		const data: { count: number; data: Team[] } = response.data;

		// Filter out teams with null team_logo
		const filteredTeams = data.data
			.filter((team) => team.team_logo !== null) // Remove teams with null logos
			.reduce((uniqueTeams, currentTeam) => {
				// Ensure unique team_code by checking if it already exists in the accumulator
				if (!uniqueTeams.some((team) => team.team_code === currentTeam.team_code)) {
					uniqueTeams.push(currentTeam);
				}
				return uniqueTeams;
			}, [] as Team[]);
		return { count: filteredTeams.length, data: filteredTeams };
	} catch (error) {
		console.log('ERROR: ', error.request)
		throw error;
	}
}
