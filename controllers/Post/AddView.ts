import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Post from '../../models/Post/Post';
import { getUserId } from '../../constants/UserId';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.body;

    const userId = (await getUserId(req)).toString();

    let post = await Post.findById(postId);

    if (!post)
      return next(new ErrorHandler(404, `cannot find post with id ${postId}`));

    post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          views: userId,
        },
      },
      { runValidators: true, new: true, upsert: true }
    );

    const { views } = post;

    return res
      .status(200)
      .json({ msg: `added user with id ${userId} to post views`, views });
  }
);
