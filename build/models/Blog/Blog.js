"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VisiblePrivacy_1 = __importDefault(require("../../enums/VisiblePrivacy"));
const PostStatus_1 = __importDefault(require("../../enums/PostStatus"));
const blogSchema = new mongoose_1.Schema({
    images: [{ type: String }],
    videos: [{ type: String }],
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: PostStatus_1.default,
        default: PostStatus_1.default.Active,
        required: true,
    },
    views: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose_1.Types.ObjectId, ref: 'Comment' }],
    expressions: {
        like: { type: Number, required: true, default: 0 },
        love: { type: Number, required: true, default: 0 },
        support: { type: Number, required: true, default: 0 },
        sad: { type: Number, required: true, default: 0 },
        happy: { type: Number, required: true, default: 0 },
        angry: { type: Number, required: true, default: 0 },
        disgust: { type: Number, required: true, default: 0 },
        surprise: { type: Number, required: true, default: 0 },
        fear: { type: Number, required: true, default: 0 },
    },
    visiblePrivacy: {
        type: String,
        enum: VisiblePrivacy_1.default,
        default: VisiblePrivacy_1.default.Public,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Blog', blogSchema);
