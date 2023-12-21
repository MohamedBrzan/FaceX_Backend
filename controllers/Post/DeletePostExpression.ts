import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Post from '../../models/Post/Post';
import { getUserId } from '../../constants/UserId';
import ErrorHandler from '../../middleware/ErrorHandler';
import ExpressionLoop from '../../constants/ExpressionLoop';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.body;

    const userId = await getUserId(req);

    let post = await Post.findById(postId);

    if (!post) return next(new ErrorHandler(404, 'this post not exists'));

    await ExpressionLoop(userId, post);

    return res.status(200).json({
      msg: 'expression deleted successfully',
      expressions: post.expressions,
    });
  }
);
