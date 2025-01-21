import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchTeamByLeague, IParamsGetTeamByLeague } from "../queries/teams";

export const useTeamByLeague = (
  params: IParamsGetTeamByLeague
) => {
    return useQuery({
        queryKey: ['teamByLeague'],
        queryFn: () => fetchTeamByLeague(params),
    })
};