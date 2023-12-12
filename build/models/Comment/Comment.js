"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VisiblePrivacy_1 = __importDefault(require("../../enums/VisiblePrivacy"));
const commentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    ref: {
        post: { type: mongoose_1.Types.ObjectId, ref: 'Post' },
        blog: { type: mongoose_1.Types.ObjectId, ref: 'Blog' },
        reel: { type: mongoose_1.Types.ObjectId, ref: 'Reel' },
    },
    replies: [{ type: mongoose_1.Types.ObjectId, ref: 'Reply' }],
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
        required: true,
        default: VisiblePrivacy_1.default.Public,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Comment', commentSchema);
