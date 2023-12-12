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
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
const Post_1 = __importDefault(require("../../models/Post/Post"));
const User_1 = __importDefault(require("../../models/User/User"));
const Comment_1 = __importDefault(require("../../models/Comment/Comment"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let post = yield Post_1.default.findById(id);
    if (!post)
        return next(new ErrorHandler_1.default(404, `Couldn't Find Post With Id => ${id}`));
    let user = yield User_1.default.findById(req['authorizedUser']._id);
    const postIndex = user.posts.findIndex((post) => post['_id'].toString() === id);
    if (postIndex >= 0) {
        user.posts.splice(postIndex, 1);
        yield user.save();
        //* Delete All Post Comments
        for (let i = 0; i < post.comments.length; i++) {
            yield Comment_1.default.findByIdAndRemove(post.comments[i].toString());
        }
        yield Post_1.default.findByIdAndRemove(id);
        return res
            .status(200)
            .json({ success: true, msg: 'Post Deleted Successfully' });
    }
    return res.status(404).json({
        success: false,
        message: "Sorry!!, You're Not The Owner Of This Post",
    });
}));
