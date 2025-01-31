import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchTeamByLeague, fetchTeamRoster, fetchTeamSeasonStats, IParamsFetchTeamRoster, IParamsFetchTeamSeasonStats, IParamsGetTeamByLeague } from "../queries/teams";

export const useTeamByLeague = (
	params: IParamsGetTeamByLeague,
	options?: UseQueryOptions // Optional parameter to extend query options
) => {
	return useQuery({
		queryKey: ['teamByLeague'],
		queryFn: () => fetchTeamByLeague({ ...params }),
	})
};

export const useTeamSeasonStats = (
	params: IParamsFetchTeamSeasonStats,
	options?: UseQueryOptions // Optional parameter to extend query options
) => {
	return useQuery({
		queryKey: ['teamSeasonStats'],
		queryFn: () => fetchTeamSeasonStats({ 
			league: params.league ?? 'NBL',
			year: params.year ?? '2024',
			seasonType: params.seasonType,
			teamCode: params?.teamCode ?? ''
		 }),
	})
};


export const useTeamRoster = (
	params: IParamsFetchTeamRoster,
	options?: UseQueryOptions // Optional parameter to extend query options
) => {
	return useQuery({
		queryKey: ['teamRoster'],
		queryFn: () => fetchTeamRoster({ 
			league: params.league ?? 'NBL',
			teamId: params.teamId
		 }),
	})
};