import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../middleware/ErrorHandler';
import FindModelInUser from './FindModelInUser';

export default async (
  res: Response,
  next: NextFunction,
  userId: string,
  user: any,
  model: any,
  modelId: string,
  property: string,
  prevExpressionName?: string,
  currentExpressionName?: string
) => {
  await FindModelInUser(
    user.replies.published,
    user.replies.reacted,
    user,
    userId,
    model,
    modelId
  );

  let foundedInPrev: boolean = false;

  if (prevExpressionName && !model.expressions[prevExpressionName])
    return next(new ErrorHandler(404, 'prev expression string not found'));

  if (currentExpressionName && !model.expressions[currentExpressionName])
    return next(new ErrorHandler(404, 'current expression string not found'));

  if (prevExpressionName && currentExpressionName) {
    for (let i = 0; i < model.expressions[prevExpressionName].length; i++) {
      if (userId === model.expressions[prevExpressionName][i].toString()) {
        model.expressions[prevExpressionName].splice(i, 1);
        await model.save();
        foundedInPrev = true;
      }
    }
  }

  if (prevExpressionName !== currentExpressionName && foundedInPrev === false)
    return next(
      new ErrorHandler(
        404,
        `something goes wrong. user not found in prevExpressionName`
      )
    );

  if (prevExpressionName && currentExpressionName && foundedInPrev === false) {
    model.expressions[currentExpressionName].push(userId);
    await model.save();
  }

  if (prevExpressionName !== currentExpressionName && foundedInPrev === true) {
    model.expressions[currentExpressionName].push(userId);
    await model.save();
  }

  return res.status(200).json(model.expressions);
};
