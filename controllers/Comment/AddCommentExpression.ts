import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Comment from '../../models/Comment/Comment';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';
import ErrorHandler from '../../middleware/ErrorHandler';
import ExpressionLoop from '../../constants/ExpressionLoop';
import FindModelInUser from '../../constants/FindModelInUser';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { expression, commentId } = req.body;

    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    let comment = await Comment.findById(commentId);

    if (!comment) return next(new ErrorHandler(404, 'this comment not exists'));

    await FindModelInUser(
      user.comments.published,
      user.comments.reacted,
      user,
      userId,
      comment,
      commentId
    );

    if (!comment.expressions[expression])
      return next(new ErrorHandler(404, 'expression string not found'));

    await ExpressionLoop(userId, comment);

    comment.expressions[expression].push(userId);
    await comment.save();

    return res.status(200).json(comment.expressions);
  }
);
