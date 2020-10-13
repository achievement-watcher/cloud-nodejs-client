"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudClient = void 0;
const Errors_1 = require("./Errors");
const got_1 = __importDefault(require("got"));
class CloudClient {
    static async getGameSchema(appId, language) {
        const url = CloudClient.baseUrl + `steam/ach/${appId}?lang=${language}`;
        let serverResponse;
        try {
            serverResponse = (await got_1.default(url)).body;
        }
        catch (error) {
            serverResponse = error.response.body;
            if (error instanceof got_1.default.HTTPError) {
                let cloudError;
                try {
                    cloudError = JSON.parse(serverResponse).error;
                }
                catch (error) {
                    throw new Errors_1.RequestError(url);
                }
                if (cloudError !== null) {
                    if (cloudError === 'this appID is currently blacklisted') {
                        throw new Errors_1.BlacklistedIdError(appId);
                    }
                    else {
                        throw new Errors_1.InternalError(url);
                    }
                }
            }
            throw new Errors_1.RequestError(url);
        }
        const cloudResponse = JSON.parse(serverResponse);
        let cloudSchema;
        if (cloudResponse.data === null) {
            throw new Errors_1.InvalidResponseError(url);
        }
        else {
            cloudSchema = cloudResponse.data;
        }
        try {
            const gameSchema = {
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
        }
        catch (error) {
            if (error instanceof SyntaxError) {
                throw new Errors_1.InvalidResponseError(url);
            }
            else {
                throw error;
            }
        }
    }
    static async getSteamUserStats(userId, appId) {
        const url = CloudClient.baseUrl + `steam/user/${userId}/stats/${appId}`;
        return JSON.parse((await got_1.default(url)).body);
    }
}
exports.CloudClient = CloudClient;
CloudClient.apiVersion = 'v1';
CloudClient.baseUrl = 'https://api.xan105.com/';
