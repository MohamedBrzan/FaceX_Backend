"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncHandler_1 = __importDefault(require("../../../middleware/AsyncHandler"));
const passport_1 = __importDefault(require("passport"));
exports.default = (0, AsyncHandler_1.default)(() => {
    console.log('first');
    return passport_1.default.authenticate('google', { scope: ['profile'] });
});
