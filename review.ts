import { Request,Response } from "express";

export let logout = (req: Request, res: Response) => {
  req.logout();
  res.redirect('/');
};
