"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const VisiblePrivacy_1 = __importDefault(require("../../enums/VisiblePrivacy"));
const commentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.default.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    ref: {
        post: { type: mongoose_1.default.Types.ObjectId, ref: 'Post' },
        blog: { type: mongoose_1.default.Types.ObjectId, ref: 'Blog' },
        reel: { type: mongoose_1.default.Types.ObjectId, ref: 'Reel' },
    },
    replies: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Reply' }],
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