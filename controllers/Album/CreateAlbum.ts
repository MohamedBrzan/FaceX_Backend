import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Album from '../../models/Album/Album';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, images } = req.body;
    let album = await Album.create({
      user: req['user']._id,
      title,
      description,
      images,
    });

    let user = await User.findById(req['user']._id);

    if (!user) {
      await Album.findByIdAndRemove(album['_id']);
      return next(
        new ErrorHandler(404, `User With Id ${req['user']._id} Not Exist`)
      );
    }

    await User.findByIdAndUpdate(req['user']._id, {
      $push: {
        albums: album['_id'],
      },
    });

    return res.status(200).json(album);
  }
);
