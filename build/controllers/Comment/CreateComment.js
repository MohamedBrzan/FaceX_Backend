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
const Comment_1 = __importDefault(require("../../models/Comment/Comment"));
const Post_1 = __importDefault(require("../../models/Post/Post"));
const Blog_1 = __importDefault(require("../../models/Blog/Blog"));
const Reel_1 = __importDefault(require("../../models/Reel/Reel"));
const User_1 = __importDefault(require("../../models/User/User"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, visiblePrivacy, ref } = req.body;
    let comment = yield Comment_1.default.create({
        user: req['authorizedUser']._id,
        message,
        visiblePrivacy,
    });
    //* Add Comment To The User Comments
    yield User_1.default.findByIdAndUpdate(req['authorizedUser']._id, { $push: { comments: comment['_id'] } }, { runValidators: true, new: true });
    //* If The Comment For Post | Blog | Reel
    if (ref.post) {
        yield Post_1.default.findByIdAndUpdate(ref.post, {
            $push: {
                comments: comment['_id'],
            },
        }, { runValidators: true, new: true });
    }
    else if (ref.blog) {
        yield Blog_1.default.findByIdAndUpdate(ref.blog, {
            $push: {
                comments: comment['_id'],
            },
        }, { runValidators: true, new: true });
    }
    else if (ref.reel) {
        yield Reel_1.default.findByIdAndUpdate(ref.reel, {
            $push: {
                comments: comment['_id'],
            },
        }, { runValidators: true, new: true });
    }
    return res.status(200).json(comment);
}));
