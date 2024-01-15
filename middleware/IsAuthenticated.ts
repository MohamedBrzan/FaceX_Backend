import { NextFunction, Request, Response } from 'express';
import AsyncHandler from './AsyncHandler';
import ErrorHandler from './ErrorHandler';
import User from '../models/User/User';
import jwt from 'jsonwebtoken';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) return next(new ErrorHandler(404, 'Not Authorized'));
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    req.user = await User.findById(decoded['id']);
    console.log(req.user);
    next();
  }
);

// export default AsyncHandler(
//   (req: Request, res: Response, next: NextFunction) => {
//     if (!req.isAuthenticated()) {
//       return next(new ErrorHandler(404, "You're not Authenticated"));
//     }
//     next();
//   }
// );
