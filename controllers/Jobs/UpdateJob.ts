import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Job from '../../models/Job/Job';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) return next(new ErrorHandler(404, `Job With Id ${id} Not Exist`));

    job = await Job.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    return res.status(200).json(job);
  }
);
