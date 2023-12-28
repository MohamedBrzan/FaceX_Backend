import { NextFunction, Request, Response } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import User from '../../models/User/User';
import Post from '../../models/Post/Post';
import Blog from '../../models/Blog/Blog';
import Reel from '../../models/Reel/Reel';
import Image from '../../models/Image/Image';
import Album from '../../models/Album/Album';
import Video from '../../models/Video/Video';
import Payment from '../../models/Payment/Payment';
import Comment from '../../models/Comment/Comment';
import Ad from '../../models/Ad/Ad';
import Notification from '../../models/Notification/Notification';
import HashTag from '../../models/HashTag/HashTag';
import Reply from '../../models/Comment/Reply';
import { getUserId } from '../../constants/UserId';
import ExpressionLoop from '../../constants/ExpressionLoop';
import ErrorHandler from '../../middleware/ErrorHandler';
import DeleteCommentModel from '../../functions/DeleteCommentModel';
import ExpressionLoopToDelete from '../../constants/ExpressionLoopToDelete';
import FindInCommentModelAndDelete from '../../functions/FindInCommentModelAndDelete';
import DeletingModel from '../../functions/DeletingModel';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    // if (user.deletion.isActive) {
    // const {
    //   date: { full, short },
    //   month,
    //   day,
    // } = user.deletion.executeIn;

    // const today = new Date().setDate(new Date().getDate() + 30);
    // const todayDate = new Date(today).toDateString();
    // const oneDay = 1000 * 60 * 60 * 24;

    // setInterval(async () => {
    //   if (todayDate == short) {
    const {
      posts,
      comments,
      replies,
      shares,
      saves,
      blogs,
      reels,
      // images,
      // albums,
      // payments,
      // videos,
      // hashTags,
      // ads,
      // notifications,
      // followers,
      // followings,
    } = user;

    //********************************/
    //********* Deleting Post ********
    //********************************/

    // //TODO: Posts, comments and replies Part
    await DeletingModel(next, Post, posts, userId, shares.posts, saves.posts);

    //! Delete the ( comments.reacted )
    if (comments.reacted.length > 0) {
      for (const commentId of comments.reacted) {
        const comment = await Comment.findById(commentId);
        Object.keys(comment.expressions).forEach((key) => {
          comment.expressions[key].forEach(async (id: any, index) => {
            if (userId === id.toString()) {
              comment.expressions[key].splice(index, 1);
              await comment.save();
              return;
            }
          });
        });
      }
    }

    //! Delete the ( replies.reacted )
    if (replies.reacted.length > 0) {
      for (const replyId of replies.reacted) {
        const reply = await Reply.findById(replyId);
        Object.keys(reply.expressions).forEach((key) => {
          reply.expressions[key].forEach(async (id: any, index) => {
            if (userId === id.toString()) {
              reply.expressions[key].splice(index, 1);
              await reply.save();
              return;
            }
          });
        });
      }
    }

    //TODO: Blog
    await DeletingModel(next, Blog, blogs, userId, shares.blogs, saves.blogs);

    //TODO: Reel
    await DeletingModel(next, Reel, reels, userId, shares.reels, saves.reels);

    return res
      .status(200)
      .json({ success: true, msg: 'User Deleted Successfully' });
  }
);
