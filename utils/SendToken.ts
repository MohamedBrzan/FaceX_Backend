import { Response } from 'express';
import User from '../models/User/User';

export default async (res: Response, user: any, status: number) => {
  const token = user.generateToken();

  const options = {
    expiresIn: 60 * 60 * 24 * 360,
    httpOnly: true,
    secure: true,
  };

  let getUser = await User.findById(user._id).select('-_id avatar name');
  return res
    .status(status)
    .cookie('token', token, options)
    .json({ success: true, user: getUser, token });
};
