import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import HashTag from '../../models/HashTag/HashTag';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let hashTag = await HashTag.findById(id);
    if (!hashTag)
      return next(new ErrorHandler(404, `HashTag With Id ${id} Not Exist`));

    hashTag = await HashTag.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });

    return res.status(200).json(hashTag);
  }
);
