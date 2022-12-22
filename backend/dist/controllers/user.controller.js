"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const prisma_model_1 = __importDefault(require("../models/prisma.model"));
const exceptions_model_1 = require("../models/exceptions.model");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma_model_1.default.user.findMany();
    return users;
});
exports.getUsers = getUsers;
const createUser = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const user = yield prisma_model_1.default.user.create({
            data: {
                username: "Alice",
                firstName: "Alice",
                lastName: "Doe",
                email: "email@email.com",
            },
        });
        return user;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                if (((_a = error.meta) === null || _a === void 0 ? void 0 : _a.target).includes("username")) {
                    throw new exceptions_model_1.UniqueConstraintException("Username taken");
                }
                else if (((_b = error.meta) === null || _b === void 0 ? void 0 : _b.target).includes("email")) {
                    throw new exceptions_model_1.UniqueConstraintException("Email already in use");
                }
            }
        }
        throw error;
    }
});
exports.createUser = createUser;
