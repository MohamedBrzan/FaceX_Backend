import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import HashTag from '../../models/HashTag/HashTag';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hashtagId } = req.body;
<<<<<<< HEAD
<<<<<<< HEAD

    let hashTag = await HashTag.findById(hashtagId);

    if (!hashTag)
      return next(
        new ErrorHandler(404, `HashTag With Id ${hashtagId} Not Exist`)
      );

=======
    let hashTag = await HashTag.findById(hashtagId);
    if (!hashTag)
      return next(
        new ErrorHandler(404, `HashTag With Id ${hashtagId} Not Exist`)
      );

>>>>>>> 16242ca (fix all hashTag controllers functions)
=======
    let hashTag = await HashTag.findById(hashtagId);
    if (!hashTag)
      return next(
        new ErrorHandler(404, `HashTag With Id ${hashtagId} Not Exist`)
      );

>>>>>>> ef8514e0446c409b4c2b279c5e2721b249df4037
    hashTag = await HashTag.findByIdAndUpdate(hashtagId, req.body, {
      runValidators: true,
      new: true,
      upsert: true,
    });

    return res.status(200).json(hashTag);
  }
);
