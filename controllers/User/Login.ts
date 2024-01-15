import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import jwt from 'jsonwebtoken';
import passport from 'passport';

export default AsyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err, user) => {
      if (err)
        return res.status(401).json({
          message:
            'Access Denied. email or password is incorrect. please try again.',
        });
      if (!user)
        return res.status(401).json({ message: 'User Not Authorized' });
      return req.logIn(user, (err) => {
        if (err) return res.status(401).json({ error: err });

        const userToken = jwt.sign(user, process.env.SESSION_SECRET);

        return res
          .cookie('token', userToken, {
            maxAge: 360000000000000,
            secure: false,
            httpOnly: true,
          })
          .status(200)
          .json(user);
      });
    })(req, res, next);
  }
);
