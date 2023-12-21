import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../../middleware/AsyncHandler';
import Reply from '../../../models/Comment/Reply';
import User from '../../../models/User/User';
import { getUserId } from '../../../constants/UserId';
import ErrorHandler from '../../../middleware/ErrorHandler';
import FindModelInUser from '../../../constants/FindModelInUser';
import ExpressionLoop from '../../../constants/ExpressionLoop';
import ToggleExpression from '../../../constants/ToggleExpression';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { replyId, prevExpressionName, currentExpressionName } = req.body;

    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    let reply = await Reply.findById(replyId);

    if (!reply) return next(new ErrorHandler(404, 'this reply not exists'));

    await ToggleExpression(
      res,
      next,
      userId,
      user,
      reply,
      replyId,
      'replies',
      prevExpressionName,
      currentExpressionName
    );

    // await FindModelInUser(
    //   user.replies.published,
    //   user.replies.reacted,
    //   user,
    //   userId,
    //   reply,
    //   replyId
    // );

    // if (!reply.expressions[expression])
    //   return next(new ErrorHandler(404, 'expression string not found'));

    // await ExpressionLoop(userId, reply);

    // reply.expressions[expression].push(userId);
    // await reply.save();

    // return res.status(200).json(reply.expressions);
  }
);
