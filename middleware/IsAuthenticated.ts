import { NextFunction, Request, Response } from 'express';
import AsyncHandler from './AsyncHandler';
import ErrorHandler from './ErrorHandler';
import User from '../models/User/User';
import jwt from 'jsonwebtoken';

// export default AsyncHandler(
// async (req: Request, res: Response, next: NextFunction) => {
// console.log(req.user)
// const { token } = req.cookies;

// if (!token) return next(new ErrorHandler(404, 'Not Authorized'));

// const decoded = jwt.decode(token, process.env.JWT_SECRET_TOKEN);

// req['user'] = await User.findById(decoded.id);

// next();
// }
// );

export default AsyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return next(new ErrorHandler(404, "You're not Authenticated"));
    }
    next();
  }
);
