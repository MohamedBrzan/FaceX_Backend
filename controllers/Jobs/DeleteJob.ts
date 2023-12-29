import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import Job from '../../models/Job/Job';
import User from '../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
   
    return res.status(404).json({
      success: false,
      message:
        "Sorry!!, You're Not The Owner Of This Job or it's already deleted",
    });
  }
);
