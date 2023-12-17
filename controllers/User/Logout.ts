import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import passport from 'passport';

export default AsyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err, user) => {
      if (!req.isAuthenticated()) {
        throw new Error('not authenticated');
      }
      req.logOut((err) => {
        if (err) return next(err);
        return res.status(200).json({ msg: 'User logged out successfully' });
      });
    })(req, res, next);
  }
);
