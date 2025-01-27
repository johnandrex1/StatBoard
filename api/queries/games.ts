import { articleInstance, instance } from '../client'

export interface INBAArticles {
    title?: string;
    url?: string;
    source?: string;
}

export interface IGames {
    home_score?: string;
    away_score?: string;
    start_time?: string;
    game_status?: string;
    league?: string;
    vanue_name?: string;
    home_name?: string;
    home_team_logo?: string;
    away_name?: string;
    away_team_logo?: string;
    broadcaster_name?: string;
    broadcaster_logo_url?: string;
}

export const fetcDashboardArticle = async () => {
    try {
        const response = await articleInstance.get(`/articles`);
        const data: INBAArticles[] = eval(response.data);
        const articles: INBAArticles[] = data.map((item) => {
            return ({...item })
        });
        return {
            count: articles.length,
            articles,
        };
    } catch (error) {
        throw new Error('Error fetching article. Please try again.');
    }
}

export const fetchLastGamesInfo = async() => {
    try {
        const response = await instance.get(`/get/NBL/matches/in/season/2024/regular/between/2025-01-01/2025-12-31`, {
            params: { limit: '10' }
        });
        
        const data: { count: number; data: any[] } = eval(response.data);
        const games: IGames[] = data.data.map((game) => {
            return ({
                home_score: game.home_score,
                away_score: game.away_score,
                start_time: game.start_time,
                game_status: game.status,
                league: game?.season?.competition?.name,
                vanue_name: game?.venue?.name,
                home_name: game?.home_team?.team_nickname,
                home_team_logo: game?.home_team?.team_logo,
                away_name: game?.away_team?.team_nickname,
                away_team_logo: game?.away_team?.team_logo,
                broadcaster_name: game?.primary_broadcaster?.name,
                broadcaster_logo_url: game?.primary_broadcaster?.logo_url
            })
        })
        return { games }
    } catch (error) {
        console.error('Error fetching player stats:', error);
        throw new Error('Failed to fetch player stats. Please try again.');
    }
}