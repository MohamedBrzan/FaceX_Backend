import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
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

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    const {
      date: { full, short },
      month,
      day,
    } = user.deletion.executeIn;

    const today = new Date().setDate(new Date().getDate() + 30);
    // const todayMonth = today.getMonth();
    // const todayDay = today.getDay();
    // const todayYear = today.getFullYear();

    setInterval(() => {
      if (new Date(today).toDateString() == short) {
        console.log('true');
      } else {
        console.log('false');
      }
    }, 1000);

    // const {
    //   posts,
    //   blogs,
    //   reels,
    //   images,
    //   albums,
    //   payments,
    //   videos,
    //   comments,
    //   replies,
    //   hashTags,
    //   ads,
    //   notifications,
    //   followers,
    //   followings,
    // } = user;
    // //! Delete All User Posts
    // if (posts?.length > 0) {
    //   for (let i = 0; i < posts.length; i++) {
    //     await Post.findByIdAndRemove(posts[i].toString());
    //   }
    // }
    // //! Delete All User Blogs
    // if (blogs?.length > 0) {
    //   for (let i = 0; i < blogs.length; i++) {
    //     await Blog.findByIdAndRemove(blogs[i].toString());
    //   }
    // }
    // //! Delete All User Reels
    // if (reels?.length > 0) {
    //   for (let i = 0; i < reels.length; i++) {
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
    // if (videos?.length > 0) {
    //   for (let i = 0; i < videos.length; i++) {
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
    // if (videos?.length > 0) {
    //   for (let i = 0; i < videos.length; i++) {
    //     await Video.findByIdAndRemove(videos[i].toString());
    //   }
    // }
    // //! Delete All User Comments
    // if (comments?.length > 0) {
    //   for (let i = 0; i < comments.length; i++) {
    //     await Comment.findByIdAndRemove(comments[i].toString());
    //   }
    // }
    // //! Delete All User Replies
    // if (replies?.length > 0) {
    //   for (let i = 0; i < replies.length; i++) {
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
    // if (hashTags?.create.length > 0) {
    //   for (let i = 0; i < hashTags.create.length; i++) {
    //     await HashTag.findByIdAndRemove(hashTags.create[i].toString());
    //   }
    // }
    // //! Delete All Hashtags That Followed By User
    // if (hashTags?.follow.length > 0) {
    //   for (let i = 0; i < hashTags.follow.length; i++) {
    //     await HashTag.findByIdAndUpdate(
    //       hashTags.follow[i].toString(),
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
    // return res
    //   .status(200)
    //   .json({ success: true, msg: 'User Deleted Successfully' });
  }
);
