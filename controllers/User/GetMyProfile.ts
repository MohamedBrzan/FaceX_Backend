import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import User from '../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>
    res.status(200).json(await User.findById(req['authorizedUser']._id))
);
