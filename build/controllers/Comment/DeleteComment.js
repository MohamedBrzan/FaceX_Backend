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
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
const User_1 = __importDefault(require("../../models/User/User"));
const Post_1 = __importDefault(require("../../models/Post/Post"));
const Blog_1 = __importDefault(require("../../models/Blog/Blog"));
const Reel_1 = __importDefault(require("../../models/Reel/Reel"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ref } = req.body;
    let comment;
    //* If The Comment For Post | Blog | Reel
    //* Remove Comment From Post
    if (ref.post !== null) {
        comment = yield Comment_1.default.findById(ref.post);
        if (!comment)
            return next(new ErrorHandler_1.default(404, `This Post Comment Id ${ref.post} Not Found`));
        //* Remove Comment From User Comments
        yield User_1.default.findByIdAndUpdate(req['user']._id, { $pull: { comments: ref.post } }, { runValidators: true, new: true });
        yield Post_1.default.findByIdAndUpdate(ref.post, {
            $pull: {
                comments: comment['_id'].toString(),
            },
        }, { runValidators: true, new: true });
        yield Comment_1.default.findByIdAndRemove(ref.post);
        //* Remove Comment From Blog
    }
    else if (ref.blog !== null) {
        comment = yield Comment_1.default.findById(ref.blog);
        if (!comment)
            return next(new ErrorHandler_1.default(404, `This Blog Comment Id ${ref.blog} Not Found`));
        //* Remove Comment From User Comments
        yield User_1.default.findByIdAndUpdate(req['user']._id, { $pull: { comments: ref.blog } }, { runValidators: true, new: true });
        yield Blog_1.default.findByIdAndUpdate(ref.blog, {
            $pull: {
                comments: ref.blog,
            },
        }, { runValidators: true, new: true });
        yield Comment_1.default.findByIdAndRemove(ref.blog);
        //* Remove Comment From Reel
    }
    else if (ref.reel !== null) {
        comment = yield Comment_1.default.findById(ref.reel);
        if (!comment)
            return next(new ErrorHandler_1.default(404, `This Reel Comment Id ${ref.reel} Not Found`));
        //* Remove Comment From User Comments
        yield User_1.default.findByIdAndUpdate(req['user']._id, { $pull: { comments: ref.reel } }, { runValidators: true, new: true });
        yield Reel_1.default.findByIdAndUpdate(ref.reel, {
            $pull: {
                comments: ref.reel,
            },
        }, { runValidators: true, new: true });
        yield Comment_1.default.findByIdAndRemove(ref.reel);
    }
    return res.status(200).json({ message: 'Comment Deleted Successfully' });
}));
