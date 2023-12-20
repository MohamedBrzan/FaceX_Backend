import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Comment from '../../models/Comment/Comment';
import Post from '../../models/Post/Post';
import Blog from '../../models/Blog/Blog';
import Reel from '../../models/Reel/Reel';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { message, visiblePrivacy, ref } = req.body;

    const userId = (await getUserId(req)).toString();

    let comment = await Comment.create({
      user: userId,
      message,
      visiblePrivacy,
    });

    //* Add Comment To The User Comments

    await User.findByIdAndUpdate(
      userId,
      { $push: { 'comments.published': comment._id } },
      { runValidators: true, new: true, upsert: true }
    );

    //* If The Comment For Post | Blog | Reel

    if (ref.post) {
      await Post.findByIdAndUpdate(
        ref.post,
        {
          $push: {
            comments: comment._id,
          },
        },
        { runValidators: true, new: true, upsert: true }
      );
      return res
        .status(200)
        .json({ msg: 'added comment to post successfully', comment });
    } else if (ref.blog) {
      await Blog.findByIdAndUpdate(
        ref.blog,
        {
          $push: {
            comments: comment._id,
          },
        },
        { runValidators: true, new: true, upsert: true }
      );
      return res
        .status(200)
        .json({ msg: 'added comment to blog successfully', comment });
    } else if (ref.reel) {
      await Reel.findByIdAndUpdate(
        ref.reel,
        {
          $push: {
            comments: comment._id,
          },
        },
        { runValidators: true, new: true, upsert: true }
      );

      return res
        .status(200)
        .json({ msg: 'added comment to reel successfully', comment });
    }
    return res.status(404).json({ msg: `cannot find this ref ${ref}` });
  }
);
