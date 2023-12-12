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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Gender_1 = __importDefault(require("../../enums/Gender"));
const Role_1 = __importDefault(require("../../enums/Role"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    images: [{ type: mongoose_1.Types.ObjectId, ref: 'Image' }],
    albums: [{ type: mongoose_1.Types.ObjectId, ref: 'Album' }],
    videos: [{ type: mongoose_1.Types.ObjectId, ref: 'Video' }],
    payments: [{ type: mongoose_1.Types.ObjectId, ref: 'Payment' }],
    comments: [{ type: mongoose_1.Types.ObjectId, ref: 'Comments' }],
    replies: [{ type: mongoose_1.Types.ObjectId, ref: 'Reply' }],
    avatar: { type: String },
    cover: { type: String },
    bio: { type: String },
    actively_recruiting: { type: Boolean, default: false },
    gender: { type: String, enum: Gender_1.default },
    role: {
        type: String,
        required: true,
        enum: Role_1.default,
        default: Role_1.default.User,
    },
    followers: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
    followings: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
    hashTags: {
        create: [{ type: mongoose_1.Types.ObjectId, ref: 'HashTag' }],
        follow: [{ type: mongoose_1.Types.ObjectId, ref: 'HashTag' }],
    },
    posts: [{ type: mongoose_1.Types.ObjectId, ref: 'Post' }],
    blogs: [{ type: mongoose_1.Types.ObjectId, ref: 'Blog' }],
    isVerified: { type: Boolean, default: false },
    ads: [{ type: mongoose_1.Types.ObjectId, ref: 'Ads' }],
    reels: [{ type: mongoose_1.Types.ObjectId, ref: 'Reels' }],
    notifications: [{ type: mongoose_1.Types.ObjectId, ref: 'Notification' }],
    saved: [{ type: mongoose_1.Types.ObjectId }],
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
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.SESSION_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
exports.default = (0, mongoose_1.model)('User', UserSchema);
