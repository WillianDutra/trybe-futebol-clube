import { NextFunction, Response } from 'express';
import { verifyToken } from '../auth/authFunctions';
import RequestWithData from '../interface/IRequest';

export default function validateToken(req: RequestWithData, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const payload = verifyToken(authorization);
    if (typeof payload !== 'string') { req.data = payload; }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
