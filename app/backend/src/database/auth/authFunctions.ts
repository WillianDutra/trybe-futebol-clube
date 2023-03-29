import * as jwt from 'jsonwebtoken';
import { IUserData } from '../interface/IUser';

const secret = String(process.env.JWT_SECRET);

export const createToken = (data: IUserData): string => {
  const { id, username, role, email } = data;
  return jwt.sign({ id, username, role, email }, secret, { algorithm: 'HS256', expiresIn: '1d' });
};

export const validateToken = (token: string) => jwt.verify(token, secret);
