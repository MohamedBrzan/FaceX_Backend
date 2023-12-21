import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../../middleware/AsyncHandler';
import Reply from '../../../models/Comment/Reply';
import { getUserId } from '../../../constants/UserId';
import ErrorHandler from '../../../middleware/ErrorHandler';
import ExpressionLoop from '../../../constants/ExpressionLoop';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { replyId } = req.body;

    const userId = await getUserId(req);

    let reply = await Reply.findById(replyId);

    if (!reply) return next(new ErrorHandler(404, 'this reply not exists'));

    await ExpressionLoop(userId, reply);

    return res.status(200).json({
      msg: 'expression deleted successfully',
      expressions: reply.expressions,
    });
  }
);
