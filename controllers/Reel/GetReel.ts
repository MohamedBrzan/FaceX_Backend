import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Reel from '../../models/Reel/Reel';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let reel = await Reel.findById(id);
    if (!reel)
      return next(new ErrorHandler(404, `Reel With Id ${id} Not Exist`));
    return res.status(200).json(reel);
  }
);
