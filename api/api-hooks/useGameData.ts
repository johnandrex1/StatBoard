import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetcDashboardArticle, fetchLastGamesInfo } from "../queries/games";


export const useDashboardArticles = (
    options?: UseQueryOptions
) => {
    return useQuery({
        queryKey: ['dashboardArticles'],
        queryFn: () => fetcDashboardArticle()
    })
}

export const useGames = (
    options?: UseQueryOptions
) => {
    return useQuery({
        queryKey: ['dashboardArticles'],
        queryFn: () => fetchLastGamesInfo()
    })
}