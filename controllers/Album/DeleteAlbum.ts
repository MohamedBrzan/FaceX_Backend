import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Album from '../../models/Album/Album';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';
import Image from '../../models/Image/Image';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let album = await Album.findById(id);
    if (!album)
      return next(new ErrorHandler(404, `Album With Id ${id} Not Exist`));

    let user = await User.findById(req['user']._id);

    const albumIndex = user.albums.findIndex(
      (album) => album['_id'].toString() === id
    );

    if (albumIndex >= 0) {
      //* Delete Album From User
      user.albums.splice(albumIndex, 1);

      //* Delete Album Images
      for (let i = 0; i < album.images.length; i++) {
        //* Delete Images From Image Model
        await Image.findByIdAndRemove(album.images[i].toString());
        //* Delete Images From User
        user.images.filter(
          (image) => image.toString() !== album.images[i].toString()
        );
      }
      await user.save();
      await Album.findByIdAndRemove(id);

      return res
        .status(200)
        .json({ success: true, msg: 'Album Deleted Successfully' });
    }

    return res.status(404).json({
      success: false,
      message: "Sorry!!, You're Not The Owner Of This Album",
    });
  }
);
