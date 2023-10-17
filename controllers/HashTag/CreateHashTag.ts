import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import HashTag from '../../models/HashTag/HashTag';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { text } = req.body;

    let user = await User.findById(req['user']._id);

    if (!user)
      return next(new ErrorHandler(404, `You Must Be Logged In First`));

    let hashTag = await HashTag.create({ user: req['user']._id, text });

    await User.findByIdAndUpdate(req['user']._id, {
      $push: {
        'hashTags.create': hashTag['_id'].toString(),
      },
    });

    return res.status(200).json(hashTag);
  }
);
