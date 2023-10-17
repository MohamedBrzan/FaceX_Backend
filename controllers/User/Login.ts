import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import SendToken from '../../utils/SendToken';
import bcrypt from 'bcrypt';
import User from '../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select('+password');

    if (!user)
      return next(new ErrorHandler(404, 'Invalid Username or Password'));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler(404, 'Invalid Username or Password'));

    return SendToken(res, user, 200);
  }
);
