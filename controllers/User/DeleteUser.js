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
const User_1 = __importDefault(require("../../models/User/User"));
const Post_1 = __importDefault(require("../../models/Post/Post"));
const Blog_1 = __importDefault(require("../../models/Blog/Blog"));
const Reel_1 = __importDefault(require("../../models/Reel/Reel"));
const Image_1 = __importDefault(require("../../models/Image/Image"));
const Album_1 = __importDefault(require("../../models/Album/Album"));
const Video_1 = __importDefault(require("../../models/Video/Video"));
const Payment_1 = __importDefault(require("../../models/Payment/Payment"));
const Comment_1 = __importDefault(require("../../models/Comment/Comment"));
const Ad_1 = __importDefault(require("../../models/Ad/Ad"));
const Notification_1 = __importDefault(require("../../models/Notification/Notification"));
const HashTag_1 = __importDefault(require("../../models/HashTag/HashTag"));
const Reply_1 = __importDefault(require("../../models/Comment/Reply"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let user = yield User_1.default.findById((_a = req['user']) === null || _a === void 0 ? void 0 : _a._id);
    if (!user)
        return next(new ErrorHandler_1.default(404, 'You Must Be Logged In First'));
    const { posts, blogs, reels, images, albums, payments, videos, comments, replies, hashTags, ads, notifications, followers, followings, } = user;
    //! Delete All User Posts
    if ((posts === null || posts === void 0 ? void 0 : posts.length) > 0) {
        for (let i = 0; i < posts.length; i++) {
            yield Post_1.default.findByIdAndRemove(posts[i].toString());
        }
    }
    //! Delete All User Blogs
    if ((blogs === null || blogs === void 0 ? void 0 : blogs.length) > 0) {
        for (let i = 0; i < blogs.length; i++) {
            yield Blog_1.default.findByIdAndRemove(blogs[i].toString());
        }
    }
    //! Delete All User Reels
    if ((reels === null || reels === void 0 ? void 0 : reels.length) > 0) {
        for (let i = 0; i < reels.length; i++) {
            yield Reel_1.default.findByIdAndRemove(reels[i].toString());
        }
    }
    //! Delete All User Images
    if ((images === null || images === void 0 ? void 0 : images.length) > 0) {
        for (let i = 0; i < images.length; i++) {
            yield Image_1.default.findByIdAndRemove(images[i].toString());
        }
    }
    //! Delete All User Albums
    if ((albums === null || albums === void 0 ? void 0 : albums.length) > 0) {
        for (let i = 0; i < albums.length; i++) {
            yield Album_1.default.findByIdAndRemove(albums[i].toString());
        }
    }
    //! Delete All User Videos
    if ((videos === null || videos === void 0 ? void 0 : videos.length) > 0) {
        for (let i = 0; i < videos.length; i++) {
            yield Video_1.default.findByIdAndRemove(videos[i].toString());
        }
    }
    //! Delete All User Payments
    if ((payments === null || payments === void 0 ? void 0 : payments.length) > 0) {
        for (let i = 0; i < payments.length; i++) {
            yield Payment_1.default.findByIdAndRemove(payments[i].toString());
        }
    }
    //! Delete All User Videos
    if ((videos === null || videos === void 0 ? void 0 : videos.length) > 0) {
        for (let i = 0; i < videos.length; i++) {
            yield Video_1.default.findByIdAndRemove(videos[i].toString());
        }
    }
    //! Delete All User Comments
    if ((comments === null || comments === void 0 ? void 0 : comments.length) > 0) {
        for (let i = 0; i < comments.length; i++) {
            yield Comment_1.default.findByIdAndRemove(comments[i].toString());
        }
    }
    //! Delete All User Replies
    if ((replies === null || replies === void 0 ? void 0 : replies.length) > 0) {
        for (let i = 0; i < replies.length; i++) {
            yield Reply_1.default.findByIdAndRemove(replies[i].toString());
        }
    }
    //! Delete All User Ads
    if ((ads === null || ads === void 0 ? void 0 : ads.length) > 0) {
        for (let i = 0; i < ads.length; i++) {
            yield Ad_1.default.findByIdAndRemove(ads[i].toString());
        }
    }
    //! Delete All Hashtags That Created By User
    if ((hashTags === null || hashTags === void 0 ? void 0 : hashTags.create.length) > 0) {
        for (let i = 0; i < hashTags.create.length; i++) {
            yield HashTag_1.default.findByIdAndRemove(hashTags.create[i].toString());
        }
    }
    //! Delete All Hashtags That Followed By User
    if ((hashTags === null || hashTags === void 0 ? void 0 : hashTags.follow.length) > 0) {
        for (let i = 0; i < hashTags.follow.length; i++) {
            yield HashTag_1.default.findByIdAndUpdate(hashTags.follow[i].toString(), { $pull: { followers: req['user']._id.toString() } }, { runValidators: true, new: true });
        }
    }
    //! Delete All User Notifications
    if ((notifications === null || notifications === void 0 ? void 0 : notifications.length) > 0) {
        for (let i = 0; i < notifications.length; i++) {
            yield Notification_1.default.findByIdAndRemove(notifications[i].toString());
        }
    }
    //! Delete All Followers
    if ((followers === null || followers === void 0 ? void 0 : followers.length) > 0) {
        for (let i = 0; i < followers.length; i++) {
            const follower = yield User_1.default.findById(followers[i].toString());
            follower.followings.splice(i, 1);
            yield follower.save();
        }
    }
    //! Delete All Followings
    if ((followings === null || followings === void 0 ? void 0 : followings.length) > 0) {
        for (let i = 0; i < followings.length; i++) {
            const following = yield User_1.default.findById(followings[i].toString());
            following.followers.splice(i, 1);
            yield following.save();
        }
    }
    yield User_1.default.findByIdAndRemove((_b = req['user']) === null || _b === void 0 ? void 0 : _b._id);
    return res
        .status(200)
        .json({ success: true, msg: 'User Deleted Successfully' });
}));
