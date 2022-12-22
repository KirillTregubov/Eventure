"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_model_1 = require("models/exceptions.model");
const errorHandler = (err, req, res, next) => {
    console.error(JSON.stringify(err));
    if (err && err instanceof exceptions_model_1.HttpException) {
        res.status(err.errorCode).json(err.message);
    }
    else if (err) {
        res.status(500).json("Internal Server Error");
    }
};
exports.default = errorHandler;
