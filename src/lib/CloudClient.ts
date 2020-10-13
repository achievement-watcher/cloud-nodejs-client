import {
    BlacklistedIdError,
    InternalError,
    InvalidResponseError,
    RequestError
} from './Errors';
import {
    CloudResponse,
    CloudSchema,
    GameSchema,
    UnlockedOrInProgressAchievement
} from '../types';
import got from 'got';

class CloudClient {
    private static readonly apiVersion = 'v1';
    private static readonly baseUrl = 'https://api.xan105.com/';

    static async getGameSchema(appId: string, language: string): Promise<GameSchema> {
        const url = CloudClient.baseUrl + `steam/ach/${appId}?lang=${language}`;
        let serverResponse: string;

        try {
            serverResponse = (await got(url)).body;
        } catch (error) {
            serverResponse = error.response.body;

            if (error instanceof got.HTTPError) {
                let cloudError: string | null;

                try {
                    cloudError = JSON.parse(serverResponse).error
                } catch (error) {
                    throw new RequestError(url);
                }

                if (cloudError !== null) {
                    if (cloudError === 'this appID is currently blacklisted') {
                        throw new BlacklistedIdError(appId);
                    } else {
                        throw new InternalError(url);
                    }
                }
            }

            throw new RequestError(url);
        }

        const cloudResponse: CloudResponse = JSON.parse(serverResponse);
        let cloudSchema: CloudSchema;

        if (cloudResponse.data === null) {
            throw new InvalidResponseError(url);
        } else {
            cloudSchema = cloudResponse.data;
        }

        try {
            const gameSchema: GameSchema = {
                // TODO API VERSION SHOULD BE READ FROM THE SERVER
                // TODO AN ERROR SHOULD BE RAISED IN CASE OF INVALID API VERSION
                apiVersion: CloudClient.apiVersion,
                appId: cloudSchema.appid.toString(),
                platform: 'Steam',
                name: cloudSchema.name,
                img: cloudSchema.img,
                achievement: cloudSchema.achievement
            };

            if ('binary' in cloudSchema) {
                gameSchema.binary = cloudSchema.binary;
            }

            return gameSchema;
        } catch (error) {
            if (error instanceof SyntaxError) {
                throw new InvalidResponseError(url);
            } else {
                throw error;
            }
        }
    }

    // TODO REWORK
    static async getSteamUserStats(userId: string, appId: string): Promise<UnlockedOrInProgressAchievement[]> {
        const url = CloudClient.baseUrl + `steam/user/${userId}/stats/${appId}`;
        return <UnlockedOrInProgressAchievement[]>JSON.parse((await got(url)).body);
    }
}

export {CloudClient}