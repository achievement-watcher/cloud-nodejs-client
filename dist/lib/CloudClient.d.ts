import { GameSchema, UnlockedOrInProgressAchievement } from '../types';
declare class CloudClient {
    private static readonly apiVersion;
    private static readonly baseUrl;
    static getGameSchema(appId: string, language: string): Promise<GameSchema>;
    static getSteamUserStats(userId: string, appId: string): Promise<UnlockedOrInProgressAchievement[]>;
}
export { CloudClient };
