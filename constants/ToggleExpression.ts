import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Post from '../../models/Post/Post';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';
import ErrorHandler from '../../middleware/ErrorHandler';
import ExpressionLoop from '../../constants/ExpressionLoop';
import FindModelInUser from '../../constants/FindModelInUser';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { expression, postId } = req.body;

    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    let post = await Post.findById(postId);

    if (!post) return next(new ErrorHandler(404, 'this post not exists'));

    await FindModelInUser(
      user.replies.published,
      user.replies.reacted,
      user,
      userId,
      post,
      postId
    );

    if (!post.expressions[expression])
      return next(new ErrorHandler(404, 'expression string not found'));

    await ExpressionLoop(userId, post);

    post.expressions[expression].push(userId);
    await post.save();

    return res.status(200).json(post.expressions);
  }
);
