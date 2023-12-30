import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../../middleware/AsyncHandler';
import Reply from '../../../models/Comment/Reply';
import ErrorHandler from '../../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let reply = await Reply.findById(id);

    if (!reply)
      return next(new ErrorHandler(404, `This Reply Id ${id} Not Found`));

    reply = await Reply.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    return res.status(200).json(reply);
  }
);
