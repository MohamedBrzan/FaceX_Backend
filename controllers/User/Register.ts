import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';
import SendToken from '../../utils/SendToken';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (user)
      return next(new ErrorHandler(500, 'This User Is Already Registered!'));

    user = await User.create(req.body);
    await user.save();

    return res.status(200).json(user);
  }
);
