declare class BlacklistedIdError extends Error {
    constructor(appId: string);
}
declare class InternalError extends Error {
    constructor(url: string);
}
declare class InvalidResponseError extends Error {
    constructor(url: string);
}
declare class RequestError extends Error {
    constructor(url: string);
}
export { BlacklistedIdError, InternalError, InvalidResponseError, RequestError };
