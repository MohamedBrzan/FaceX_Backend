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
const User_1 = __importDefault(require("../models/User/User"));
exports.default = (res, user, status) => __awaiter(void 0, void 0, void 0, function* () {
    const token = user.generateToken();
    const options = {
        expiresIn: 60 * 60 * 24 * 360,
        httpOnly: true,
        secure: true,
    };
    let getUser = yield User_1.default.findById(user._id).select('-_id avatar name');
    return res
        .status(status)
        .cookie('token', token, options)
        .json({ success: true, user: getUser, token });
});
