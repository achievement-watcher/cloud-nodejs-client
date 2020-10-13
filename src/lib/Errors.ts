class BlacklistedIdError extends Error {
    constructor(appId: string) {
        super('App ID ' + appId + ' is blacklisted');
    }
}

class InternalError extends Error {
    constructor(url: string) {
        super('Cloud internal error. Request url: ' + url);
    }
}

class InvalidResponseError extends Error {
    constructor(url: string) {
        super('Cloud Invalid Response. Request url: ' + url);
    }
}

class RequestError extends Error {
    constructor(url: string) {
        super('Error trying to reach Cloud. Request url: ' + url);
    }
}

export {
    BlacklistedIdError,
    InternalError,
    InvalidResponseError,
    RequestError
}