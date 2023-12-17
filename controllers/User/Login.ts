import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import SendToken from '../../utils/SendToken';
import bcrypt from 'bcrypt';
import User from '../../models/User/User';
import passport from 'passport';

export default function
   (req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', async (err: any, user: any) => {
      if (err) {
        throw err;
      }

      console.log(user)

      // const { email, password } = req.body;

      // let usr = await User.findOne({ email }).select('+password');

      // if (!user)
      //   return next(new ErrorHandler(404, 'Invalid Username or Password'));

      // const isMatch = await bcrypt.compare(password, user.password);

      // if (!isMatch)
      //   return next(new ErrorHandler(404, 'Invalid Username or Password'));

      // req.logIn(user, (err) => {
      //   if (err) {
      //     return err;
      //   }
      // });
    })(req, res, next);
  }

