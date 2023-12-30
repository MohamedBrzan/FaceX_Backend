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
const User_1 = __importDefault(require("../../models/User/User"));
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
const UserId_1 = require("../../constants/UserId");
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    const { following } = req.body;
    let user = yield User_1.default.findById(userId).select('followings name _id');
    if (following === user._id.toString())
        return next(new ErrorHandler_1.default(500, 'You Cannot Follow Yourself'));
    let follower = yield User_1.default.findById(following).select('followers name');
    const userIndex = (_a = follower === null || follower === void 0 ? void 0 : follower.followers) === null || _a === void 0 ? void 0 : _a.findIndex((f) => f.toString() === userId);
    if (((_b = follower === null || follower === void 0 ? void 0 : follower.followers) === null || _b === void 0 ? void 0 : _b.length) > 0 && userIndex)
        return next(new ErrorHandler_1.default(500, `${follower.name} Is Already In Your Followings`));
    let followingIndex = (_c = user === null || user === void 0 ? void 0 : user.followings) === null || _c === void 0 ? void 0 : _c.findIndex((f) => f.toString() === following);
    if (((_d = user === null || user === void 0 ? void 0 : user.followings) === null || _d === void 0 ? void 0 : _d.length) > 0 && followingIndex)
        return next(new ErrorHandler_1.default(500, `${following === null || following === void 0 ? void 0 : following.name} Is Already In Your Followers`));
    //* Following The User
    follower.followers.push(userId);
    yield follower.save();
    //* Follow The User
    user.followings.push(following);
    yield user.save();
    return res.status(200).json({
        message: `You Followed ${follower === null || follower === void 0 ? void 0 : follower.name.first} Successfully`,
    });
}));
