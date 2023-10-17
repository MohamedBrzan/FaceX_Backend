import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import HashTag from '../../models/HashTag/HashTag';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let hashTag = await HashTag.findById(id);
    if (!hashTag)
      return next(new ErrorHandler(404, `HashTag With Id ${id} Not Exist`));

    res.status(200).json(hashTag);
  }
);
