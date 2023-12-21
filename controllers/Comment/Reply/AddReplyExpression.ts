import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../../middleware/AsyncHandler';
import Reply from '../../../models/Comment/Reply';
import User from '../../../models/User/User';
import { getUserId } from '../../../constants/UserId';
import ErrorHandler from '../../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { expression, replyId } = req.body;

    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    let reply = await Reply.findById(replyId);

    if (!reply) return next(new ErrorHandler(404, 'this reply not exists'));

    const findReplyInUserReacted = user.replies.reacted.findIndex(
      (p) => p.toString() === replyId
    );

    const findReplyInUserPublished = user.replies.published.findIndex(
      (p) => p.toString() === replyId
    );

    if (findReplyInUserReacted === -1 && findReplyInUserPublished === -1 && reply.user.toString() !== userId) {
      user.replies.reacted.push(replyId);
      await user.save();
    }

    let found: boolean = false;

    if (!reply.expressions[expression])
      return next(new ErrorHandler(404, 'expression string not found'));

    do {
      // TODO // Search for userId in the like expression
      for (let i = 0; i < reply.expressions.like.length; i++) {
        if (userId === reply.expressions.like[i].toString()) {
          reply.expressions.like.splice(i, 1);
          await reply.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the love expression
      for (let i = 0; i < reply.expressions.love.length; i++) {
        if (userId === reply.expressions.love[i].toString()) {
          reply.expressions.love.splice(i, 1);
          await reply.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the support expression
      for (let i = 0; i < reply.expressions.support.length; i++) {
        if (userId === reply.expressions.support[i].toString()) {
          reply.expressions.support.splice(i, 1);
          await reply.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the sad expression
      for (let i = 0; i < reply.expressions.sad.length; i++) {
        if (userId === reply.expressions.sad[i].toString()) {
          reply.expressions.sad.splice(i, 1);
          await reply.save();
          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the happy expression
      for (let i = 0; i < reply.expressions.happy.length; i++) {
        if (userId === reply.expressions.happy[i].toString()) {
          reply.expressions.happy.splice(i, 1);
          await reply.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the angry expression
      for (let i = 0; i < reply.expressions.angry.length; i++) {
        if (userId === reply.expressions.angry[i].toString()) {
          reply.expressions.angry.splice(i, 1);
          await reply.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the disgust expression
      for (let i = 0; i < reply.expressions.disgust.length; i++) {
        if (userId === reply.expressions.disgust[i].toString()) {
          reply.expressions.disgust.splice(i, 1);
          await reply.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the surprise expression
      for (let i = 0; i < reply.expressions.surprise.length; i++) {
        if (userId === reply.expressions.surprise[i].toString()) {
          reply.expressions.surprise.splice(i, 1);
          await reply.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the fear expression
      for (let i = 0; i < reply.expressions.fear.length; i++) {
        if (userId === reply.expressions.fear[i].toString()) {
          reply.expressions.fear.splice(i, 1);
          await reply.save();

          found = true;
        }
        found = false;
      }
    } while (found);

    if (!found) {
      reply.expressions[expression].push(userId);
      await reply.save();
    }

    return res.status(200).json(reply.expressions);
  }
);
