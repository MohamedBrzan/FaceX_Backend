import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Comment from '../../models/Comment/Comment';
import Post from '../../models/Post/Post';
import Blog from '../../models/Blog/Blog';
import Reel from '../../models/Reel/Reel';
import User from '../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { message, visiblePrivacy, ref } = req.body;

    let comment = await Comment.create({
      user: req['user']._id,
      message,
      visiblePrivacy,
    });

    //* Add Comment To The User Comments

    await User.findByIdAndUpdate(
      req['user']._id,
      { $push: { comments: comment['_id'] } },
      { runValidators: true, new: true }
    );

    //* If The Comment For Post | Blog | Reel

    if (ref.post) {
      await Post.findByIdAndUpdate(
        ref.post,
        {
          $push: {
            comments: comment['_id'],
          },
        },
        { runValidators: true, new: true }
      );
    } else if (ref.blog) {
      await Blog.findByIdAndUpdate(
        ref.blog,
        {
          $push: {
            comments: comment['_id'],
          },
        },
        { runValidators: true, new: true }
      );
    } else if (ref.reel) {
      await Reel.findByIdAndUpdate(
        ref.reel,
        {
          $push: {
            comments: comment['_id'],
          },
        },
        { runValidators: true, new: true }
      );
    }

    return res.status(200).json(comment);
  }
);
