import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Comment from '../../models/Comment/Comment';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';
import ErrorHandler from '../../middleware/ErrorHandler';
import ExpressionLoop from '../../constants/ExpressionLoop';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.body;

    const userId = await getUserId(req);

    let comment = await Comment.findById(commentId);

    if (!comment) return next(new ErrorHandler(404, 'this comment not exists'));

    await ExpressionLoop(userId, comment);

    return res.status(200).json({
      msg: 'expression deleted successfully',
      expressions: comment.expressions,
    });
  }
);
