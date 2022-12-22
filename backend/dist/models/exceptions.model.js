"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueConstraintException = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(errorCode, message) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        this.errorCode = errorCode;
    }
}
exports.HttpException = HttpException;
class UniqueConstraintException extends HttpException {
    constructor(message) {
        super(409, message);
    }
}
exports.UniqueConstraintException = UniqueConstraintException;
