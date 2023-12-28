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
      // blogs,
      // reels,
      // images,
      // albums,
      // payments,
      // videos,
      // comments,
      // replies,
      // hashTags,
      // ads,
      // notifications,
      // followers,
      // followings,
    } = user;
    //! Delete All User Posts
    if (posts?.published.length > 0) {
      for (const postId of posts.published) {
        const post = await Post.findById(postId.toString());
        const userWhoDoExpression = ExpressionLoop(post);
        //! Delete every user do expression
        if (userWhoDoExpression.size > 0) {
          for (const userId of userWhoDoExpression) {
            const user = await User.findById(userId.toString());
            if (!user)
              return next(
                new ErrorHandler(404, `user with id ${userId} not found in DB`)
              );
            user.posts.reacted.splice(user.posts.reacted.indexOf(post), 1);
            await user.save();
          }
        }
        //! Delete every user do comment and reply
        if (post?.comments?.length > 0) {
          await FindInCommentModelAndDelete(post, userId);
        }

        await Post.findByIdAndRemove(postId);
      }
    }
    if (posts?.reacted?.length > 0) {
      for (const postId of posts.reacted) {
        const post = await Post.findById(postId.toString());
        //* find the user in post.expressions and deleted and return true, or false if not exist
        await ExpressionLoopToDelete(post, userId);
        if (post.comments?.length > 0) {
          await FindInCommentModelAndDelete(post, userId);
        }
      }
    }

    // await Post.findByIdAndRemove(posts[i].published.toString());
    // //! Delete All User Blogs
    // if (blogs?.published.length > 0) {
    //   for (let i = 0; i < blogs.published.length; i++) {
    //     await Blog.findByIdAndRemove(blogs[i].toString());
    //   }
    // }
    // if (blogs?.reacted.length > 0) {
    //   for (let i = 0; i < blogs.reacted.length; i++) {
    //     await Blog.findByIdAndRemove(blogs[i].toString());
    //   }
    // }
    // //! Delete All User Reels
    // if (reels?.published.length > 0) {
    //   for (let i = 0; i < reels.published.length; i++) {
    //     await Reel.findByIdAndRemove(reels[i].toString());
    //   }
    // }
    // if (reels?.reacted.length > 0) {
    //   for (let i = 0; i < reels.reacted.length; i++) {
    //     await Reel.findByIdAndRemove(reels[i].toString());
    //   }
    // }
    // //! Delete All User Images
    // if (images?.length > 0) {
    //   for (let i = 0; i < images.length; i++) {
    //     await Image.findByIdAndRemove(images[i].toString());
    //   }
    // }
    // //! Delete All User Albums
    // if (albums?.length > 0) {
    //   for (let i = 0; i < albums.length; i++) {
    //     await Album.findByIdAndRemove(albums[i].toString());
    //   }
    // }
    // //! Delete All User Videos
    // if (videos?.published.length > 0) {
    //   for (let i = 0; i < videos.published.length; i++) {
    //     await Video.findByIdAndRemove(videos[i].toString());
    //   }
    // }
    // if (videos?.reacted.length > 0) {
    //   for (let i = 0; i < videos.reacted.length; i++) {
    //     await Video.findByIdAndRemove(videos[i].toString());
    //   }
    // }
    // //! Delete All User Payments
    // if (payments?.length > 0) {
    //   for (let i = 0; i < payments.length; i++) {
    //     await Payment.findByIdAndRemove(payments[i].toString());
    //   }
    // }
    // //! Delete All User Videos
    // if (videos?.published.length > 0) {
    //   for (let i = 0; i < videos.published.length; i++) {
    //     await Video.findByIdAndRemove(videos[i].toString());
    //   }
    // }
    // if (videos?.reacted.length > 0) {
    //   for (let i = 0; i < videos.reacted.length; i++) {
    //     await Video.findByIdAndRemove(videos[i].toString());
    //   }
    // }
    // //! Delete All User Comments
    // if (comments?.published.length > 0) {
    //   for (let i = 0; i < comments.published.length; i++) {
    //     await Comment.findByIdAndRemove(comments[i].toString());
    //   }
    // }
    // if (comments?.reacted.length > 0) {
    //   for (let i = 0; i < comments.reacted.length; i++) {
    //     await Comment.findByIdAndRemove(comments[i].toString());
    //   }
    // }
    // //! Delete All User Replies
    // if (replies?.published.length > 0) {
    //   for (let i = 0; i < replies.published.length; i++) {
    //     await Reply.findByIdAndRemove(replies[i].toString());
    //   }
    // }
    // if (replies?.reacted.length > 0) {
    //   for (let i = 0; i < replies.reacted.length; i++) {
    //     await Reply.findByIdAndRemove(replies[i].toString());
    //   }
    // }
    // //! Delete All User Ads
    // if (ads?.length > 0) {
    //   for (let i = 0; i < ads.length; i++) {
    //     await Ad.findByIdAndRemove(ads[i].toString());
    //   }
    // }
    // //! Delete All Hashtags That Created By User
    // if (hashTags?.published.length > 0) {
    //   for (let i = 0; i < hashTags.published.length; i++) {
    //     await HashTag.findByIdAndRemove(hashTags.published[i].toString());
    //   }
    // }
    // if (hashTags?.reacted.length > 0) {
    //   for (let i = 0; i < hashTags.reacted.length; i++) {
    //     await HashTag.findByIdAndRemove(hashTags.reacted[i].toString());
    //   }
    // }
    // //! Delete All Hashtags That Followed By User
    // if (hashTags?.reacted.length > 0) {
    //   for (let i = 0; i < hashTags.reacted.length; i++) {
    //     await HashTag.findByIdAndUpdate(
    //       hashTags.reacted[i].toString(),
    //       { $pull: { followers: userId } },
    //       { runValidators: true, new: true }
    //     );
    //   }
    // }
    // //! Delete All User Notifications
    // if (notifications?.length > 0) {
    //   for (let i = 0; i < notifications.length; i++) {
    //     await Notification.findByIdAndRemove(notifications[i].toString());
    //   }
    // }
    // //! Delete All Followers
    // if (followers?.length > 0) {
    //   for (let i = 0; i < followers.length; i++) {
    //     const follower = await User.findById(followers[i].toString());
    //     follower.followings.splice(i, 1);
    //     await follower.save();
    //   }
    // }
    // //! Delete All Followings
    // if (followings?.length > 0) {
    //   for (let i = 0; i < followings.length; i++) {
    //     const following = await User.findById(followings[i].toString());
    //     following.followers.splice(i, 1);
    //     await following.save();
    //   }
    // }
    // await User.findByIdAndRemove(userId);
    return res
      .status(200)
      .json({ success: true, msg: 'User Deleted Successfully' });
    //   }
    //   return res.status(404).json({
    //     success: false,
    //     msg: 'User will delete automatically when Deletion timing date is come',
    //   });
    // }, oneDay);
    // }

    // return res.status(404).json({ success: false, msg: 'User Deletion Failed' });
  }
);
