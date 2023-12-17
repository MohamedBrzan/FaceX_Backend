import { Request } from 'express';

export const getUserId = async (req: Request) => req.user['id'];
