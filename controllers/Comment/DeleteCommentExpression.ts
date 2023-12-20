import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Comment from '../../models/Comment/Comment';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.body;

    const userId = await getUserId(req);

    let comment = await Comment.findById(commentId);

    if (!comment) return next(new ErrorHandler(404, 'this comment not exists'));

    let found: boolean = false;

    do {
      // TODO // Search for userId in the like expression
      for (let i = 0; i < comment.expressions.like.length; i++) {
        if (userId === comment.expressions.like[i].toString()) {
          comment.expressions.like.splice(i, 1);
          await comment.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the love expression
      for (let i = 0; i < comment.expressions.love.length; i++) {
        if (userId === comment.expressions.love[i].toString()) {
          comment.expressions.love.splice(i, 1);
          await comment.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the support expression
      for (let i = 0; i < comment.expressions.support.length; i++) {
        if (userId === comment.expressions.support[i].toString()) {
          comment.expressions.support.splice(i, 1);
          await comment.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the sad expression
      for (let i = 0; i < comment.expressions.sad.length; i++) {
        if (userId === comment.expressions.sad[i].toString()) {
          comment.expressions.sad.splice(i, 1);
          await comment.save();
          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the happy expression
      for (let i = 0; i < comment.expressions.happy.length; i++) {
        if (userId === comment.expressions.happy[i].toString()) {
          comment.expressions.happy.splice(i, 1);
          await comment.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the angry expression
      for (let i = 0; i < comment.expressions.angry.length; i++) {
        if (userId === comment.expressions.angry[i].toString()) {
          comment.expressions.angry.splice(i, 1);
          await comment.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the disgust expression
      for (let i = 0; i < comment.expressions.disgust.length; i++) {
        if (userId === comment.expressions.disgust[i].toString()) {
          comment.expressions.disgust.splice(i, 1);
          await comment.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the surprise expression
      for (let i = 0; i < comment.expressions.surprise.length; i++) {
        if (userId === comment.expressions.surprise[i].toString()) {
          comment.expressions.surprise.splice(i, 1);
          await comment.save();

          found = true;
        }
        found = false;
      }

      // TODO // Search for userId in the fear expression
      for (let i = 0; i < comment.expressions.fear.length; i++) {
        if (userId === comment.expressions.fear[i].toString()) {
          comment.expressions.fear.splice(i, 1);
          await comment.save();

          found = true;
        }
        found = false;
      }
    } while (found);

    return res.status(200).json({
      msg: 'expression deleted successfully',
      expressions: comment.expressions,
    });
  }
);
