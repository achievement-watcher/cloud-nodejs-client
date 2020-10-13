export interface Achievement {
    name: string;
    defaultvalue: number;
    hidden: 0 | 1;
    icon: string;
    icongray: string;
}
export interface CloudResponse {
    error: string | null;
    data: CloudSchema | null;
}

export interface CloudSchema {
    apiVersion: string;
    appid: string;
    name: string;
    binary?: string;
    img: {
        header?: string;
        background?: string;
        portrait?: string;
        icon?: string;
    }
    achievement: {
        total: number;
        list: Achievement[];
    }
}

export interface GameSchema {
    apiVersion: string;
    appId: string;
    platform: Platform;
    name: string;
    binary?: string;
    img: {
        header?: string;
        background?: string;
        portrait?: string;
        icon?: string;
    }
    achievement: {
        total: number;
        list: Achievement[];
    }
}

export type Platform = 'Steam';

export interface UnlockedOrInProgressAchievement {
    name: string;
    achieved: 0 | 1;
    currentProgress: number;
    maxProgress: number;
    unlockTime: number;
}