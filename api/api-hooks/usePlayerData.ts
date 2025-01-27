import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchAllPlayersInASeason, fetchPlayerStatsInSpecificSeason, IFetchAllPlayersInASeason, IFetchPlayerStatsInSpecificSeason, IPramsFetchAllPlayersInASeason } from "../queries/players";


export const useAllPlayersInASeason = (
    params: IPramsFetchAllPlayersInASeason,
    options?: UseQueryOptions // Optional parameter to extend query options
) => {
    return useQuery({
        queryKey: ['allPlayersInASeason'],
        queryFn: () => fetchAllPlayersInASeason({...params}),
    })
};

export const usePlayerStatsInSpecificSeason = (
    params: IFetchPlayerStatsInSpecificSeason,
    options?: UseQueryOptions // Optional parameter to extend query options
) => {
    return useQuery({
        queryKey: ['playerInASpecificSeason'],
        queryFn: () => fetchPlayerStatsInSpecificSeason({ ...params }),
    })
};