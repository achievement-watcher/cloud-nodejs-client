"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestError = exports.InvalidResponseError = exports.InternalError = exports.BlacklistedIdError = void 0;
class BlacklistedIdError extends Error {
    constructor(appId) {
        super('App ID ' + appId + ' is blacklisted');
    }
}
exports.BlacklistedIdError = BlacklistedIdError;
class InternalError extends Error {
    constructor(url) {
        super('Cloud internal error. Request url: ' + url);
    }
}
exports.InternalError = InternalError;
class InvalidResponseError extends Error {
    constructor(url) {
        super('Cloud Invalid Response. Request url: ' + url);
    }
}
exports.InvalidResponseError = InvalidResponseError;
class RequestError extends Error {
    constructor(url) {
        super('Error trying to reach Cloud. Request url: ' + url);
    }
}
exports.RequestError = RequestError;
