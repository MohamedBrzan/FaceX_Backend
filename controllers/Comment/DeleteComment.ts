import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Comment from '../../models/Comment/Comment';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';
import Post from '../../models/Post/Post';
import Blog from '../../models/Blog/Blog';
import Reel from '../../models/Reel/Reel';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ref } = req.body;

    let comment;

    //* If The Comment For Post | Blog | Reel

    //* Remove Comment From Post
    if (ref.post !== null) {
      comment = await Comment.findById(ref.post);

      if (!comment)
        return next(
          new ErrorHandler(404, `This Post Comment Id ${ref.post} Not Found`)
        );

      //* Remove Comment From User Comments

      await User.findByIdAndUpdate(
        req['authorizedUser']._id,
        { $pull: { comments: ref.post } },
        { runValidators: true, new: true }
      );

      await Post.findByIdAndUpdate(
        ref.post,
        {
          $pull: {
            comments: comment['_id'].toString(),
          },
        },
        { runValidators: true, new: true }
      );
      await Comment.findByIdAndRemove(ref.post);

      //* Remove Comment From Blog
    } else if (ref.blog !== null) {
      comment = await Comment.findById(ref.blog);

      if (!comment)
        return next(
          new ErrorHandler(404, `This Blog Comment Id ${ref.blog} Not Found`)
        );

      //* Remove Comment From User Comments

      await User.findByIdAndUpdate(
        req['authorizedUser']._id,
        { $pull: { comments: ref.blog } },
        { runValidators: true, new: true }
      );

      await Blog.findByIdAndUpdate(
        ref.blog,
        {
          $pull: {
            comments: ref.blog,
          },
        },
        { runValidators: true, new: true }
      );

      await Comment.findByIdAndRemove(ref.blog);

      //* Remove Comment From Reel
    } else if (ref.reel !== null) {
      comment = await Comment.findById(ref.reel);

      if (!comment)
        return next(
          new ErrorHandler(404, `This Reel Comment Id ${ref.reel} Not Found`)
        );

      //* Remove Comment From User Comments

      await User.findByIdAndUpdate(
        req['authorizedUser']._id,
        { $pull: { comments: ref.reel } },
        { runValidators: true, new: true }
      );

      await Reel.findByIdAndUpdate(
        ref.reel,
        {
          $pull: {
            comments: ref.reel,
          },
        },
        { runValidators: true, new: true }
      );

      await Comment.findByIdAndRemove(ref.reel);
    }

    return res.status(200).json({ message: 'Comment Deleted Successfully' });
  }
);
