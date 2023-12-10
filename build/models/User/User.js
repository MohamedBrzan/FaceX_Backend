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
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Gender_1 = __importDefault(require("../../enums/Gender"));
const Role_1 = __importDefault(require("../../enums/Role"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    images: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Image' }],
    albums: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Album' }],
    videos: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Video' }],
    payments: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Payment' }],
    comments: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Comments' }],
    replies: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Reply' }],
    avatar: { type: String },
    bio: { type: String },
    gender: { type: String, enum: Gender_1.default },
    role: {
        type: String,
        required: true,
        enum: Role_1.default,
        default: Role_1.default.User,
    },
    followers: [{ type: mongoose_1.default.Types.ObjectId, ref: 'User' }],
    followings: [{ type: mongoose_1.default.Types.ObjectId, ref: 'User' }],
    hashTags: {
        create: [{ type: mongoose_1.default.Types.ObjectId, ref: 'HashTag' }],
        follow: [{ type: mongoose_1.default.Types.ObjectId, ref: 'HashTag' }],
    },
    posts: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Post' }],
    blogs: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Blog' }],
    isVerified: { type: Boolean, default: false },
    ads: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Ads' }],
    reels: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Reels' }],
    notifications: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Notification' }],
    saved: [{ type: mongoose_1.default.Types.ObjectId }],
    location: { type: String },
    website: { type: String },
    github: { type: String },
    deletion: { type: Date },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
// Hash Password before saving
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password')) {
            this.password = yield bcrypt_1.default.hash(this.password, 12);
        }
        next();
    });
});
// Match Password to hashed password in database
// UserSchema.methods.passwordValidation = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };
// Generate Token for UserSchema
UserSchema.methods.generateToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.JWT_SECRET_TOKEN, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
exports.default = (0, mongoose_1.model)('User', UserSchema);