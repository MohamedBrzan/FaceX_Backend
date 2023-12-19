import { Schema, model, Types } from 'mongoose';
import User from '../../Interfaces/User/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Gender from '../../enums/Gender';
import Role from '../../enums/Role';
import VisiblePrivacy from '../../enums/VisiblePrivacy';
import FilterContent from '../../enums/FilterContent';

const UserSchema = new Schema<User>(
  {
    name: {
      first: { type: String, required: true, trim: true },
      last: { type: String, required: true, trim: true },
      additional: { type: String, required: true, trim: true },
    },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true, select: false },
    avatar: { type: String },
    cover: { type: String },
    bio: { type: String, trim: true },
    gender: { type: String, enum: Gender },
    disability: { type: String, trim: true },
    headline: { type: String, trim: true },
    professions: [{ type: String, trim: true }],
    industry: { type: String, trim: true },
    role: {
      type: String,
      required: true,
      enum: Role,
      default: Role.User,
    },
    address: { type: String, trim: true },
    location: { type: String, trim: true },
    contact: {
      profile: { type: String, trim: true },
      website: { type: String, trim: true },
      phone: { type: String, trim: true },
      birthday: {
        day: { type: Number },
        month: { type: String },
        year: { type: Number },
      },
    },
    analytics: [
      {
        count: { type: Number },
        name: { type: String, trim: true },
        percentage: { type: Number },
        time: { type: String, trim: true },
      },
    ],
    profile_topics: [{ type: String, trim: true }],
    creator_tools: {
      live: [{ type: String, trim: true }],
      events: [{ type: String, trim: true }],
      newsletters: [{ type: String, trim: true }],
      follow_link: [{ type: String, trim: true }],
    },
    open_to: [
      {
        title: { type: String, trim: true },
        description: { type: String, trim: true },
      },
    ],
    tags: [{ type: String, trim: true }],
    blocks: [{ type: Types.ObjectId, ref: 'User' }],
    followers: [{ type: Types.ObjectId, ref: 'User' }],
    followings: [{ type: Types.ObjectId, ref: 'User' }],
    images: [{ type: Types.ObjectId, ref: 'Image' }],
    albums: [{ type: Types.ObjectId, ref: 'Album' }],
    videos: [{ type: Types.ObjectId, ref: 'Video' }],
    payments: [{ type: Types.ObjectId, ref: 'Payment' }],
    comments: [{ type: Types.ObjectId, ref: 'Comments' }],
    replies: [{ type: Types.ObjectId, ref: 'Reply' }],
    hashTags: {
      create: [{ type: Types.ObjectId, ref: 'HashTag' }],
      follow: [{ type: Types.ObjectId, ref: 'HashTag' }],
    },
    posts: [{ type: Types.ObjectId, ref: 'Post' }],
    blogs: [{ type: Types.ObjectId, ref: 'Blog' }],
    jobs: [{ type: Types.ObjectId, ref: 'Job' }],
    ads: [{ type: Types.ObjectId, ref: 'Ads' }],
    reels: [{ type: Types.ObjectId, ref: 'Reels' }],
    notifications: [{ type: Types.ObjectId, ref: 'Notification' }],
    saved: [{ type: Types.ObjectId }],
    hyperlinks: [
      {
        for: { type: String, trim: true },
        link: { type: String, trim: true },
      },
    ],
    preferences: {
      language: {
        app: { type: String, trim: true },
        content: { type: String, trim: true },
      },
      auto_videos: { type: Boolean, default: false },
      sounds_effects: { type: Boolean, default: false },
      visibility: {
        profile_photos: {
          type: String,
          enum: VisiblePrivacy,
          default: VisiblePrivacy.public,
        },
        feed: {
          type: String,
          enum: FilterContent,
          default: FilterContent.recommended,
        },
      },
      people: {
        also_viewed: { type: Boolean, default: false },
        unFollowed: [{ type: Types.ObjectId, ref: 'User' }],
      },
      display: {
        dark_mode: { type: Boolean, default: false },
      },
    },
    deletion: {
      executeIn: {
        date: {
          full: { type: String },
          short: { type: String },
        },
        month: { type: Number },
        day: { type: Number },
      },
    },
    actively_recruiting: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hash Password before saving
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

UserSchema.methods.verifyPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Match Password to hashed password in database
// UserSchema.methods.passwordValidation = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// Generate Token for UserSchema
UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default model('User', UserSchema);
