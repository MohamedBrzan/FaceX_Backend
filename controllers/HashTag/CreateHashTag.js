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
const AsyncHandler_1 = __importDefault(require("../../middleware/AsyncHandler"));
const HashTag_1 = __importDefault(require("../../models/HashTag/HashTag"));
const User_1 = __importDefault(require("../../models/User/User"));
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    let user = yield User_1.default.findById(req['user']._id);
    if (!user)
        return next(new ErrorHandler_1.default(404, `You Must Be Logged In First`));
    let hashTag = yield HashTag_1.default.create({ user: req['user']._id, text });
    yield User_1.default.findByIdAndUpdate(req['user']._id, {
        $push: {
            'hashTags.create': hashTag['_id'].toString(),
        },
    });
    return res.status(200).json(hashTag);
}));
