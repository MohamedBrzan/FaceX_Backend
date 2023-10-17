import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Image from '../../models/Image/Image';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';
import Album from '../../models/Album/Album';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { image, ref } = req.body;

    let img = await Image.create({ user: req['user']._id, image, ref });

    let user = await User.findById(req['user']._id);

    if (!user) {
      await Image.findByIdAndRemove(img['_id']);
      return next(
        new ErrorHandler(404, `User With Id ${req['user']._id} Not Exist`)
      );
    }

    await User.findByIdAndUpdate(req['user']._id, {
      $push: {
        images: img['_id'],
      },
    });

    await Album.findByIdAndUpdate(ref, {
      $push: {
        images: img['_id'],
      },
    });

    return res.status(200).json(img);
  }
);
