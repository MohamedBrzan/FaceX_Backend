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
    var _a, _b, _c;
    const { hashTagId } = req.body;
    let hashTag = yield HashTag_1.default.findById(hashTagId).select('followers');
    if (!hashTag)
        return next(new ErrorHandler_1.default(404, `Cannot Find HashTag With Id : ${hashTagId}`));
    let user = yield User_1.default.findById(req['authorizedUser']._id).select('hashTags');
    const findHashTagOwner = (_b = (_a = user === null || user === void 0 ? void 0 : user.hashTags) === null || _a === void 0 ? void 0 : _a.create) === null || _b === void 0 ? void 0 : _b.findIndex((tag) => tag === hashTag);
    if (findHashTagOwner > -1)
        return next(new ErrorHandler_1.default(500, `You Cannot Follow Your HashTag`));
    const findUser = (_c = hashTag === null || hashTag === void 0 ? void 0 : hashTag.followers) === null || _c === void 0 ? void 0 : _c.findIndex((user) => user.toString() === req['authorizedUser']._id.toString());
    if (findUser > -1)
        return next(new ErrorHandler_1.default(500, `You Already Following This HashTag`));
    hashTag.followers.push(req['authorizedUser']._id.toString());
    yield hashTag.save();
    user.hashTags.follow.push(hashTagId);
    yield user.save();
    return res.status(200).json({ message: 'You Follow HashTag Successfully' });
}));
