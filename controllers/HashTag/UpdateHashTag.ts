import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import HashTag from '../../models/HashTag/HashTag';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hashtagId } = req.body;

    let hashTag = await HashTag.findById(hashtagId);

    if (!hashTag)
      return next(
        new ErrorHandler(404, `HashTag With Id ${hashtagId} Not Exist`)
      );

    hashTag = await HashTag.findByIdAndUpdate(hashtagId, req.body, {
      runValidators: true,
      new: true,
      upsert: true,
    });

    return res.status(200).json(hashTag);
  }
);
