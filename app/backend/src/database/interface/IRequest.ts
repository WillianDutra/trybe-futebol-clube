import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export default interface RequestWithData extends Request {
  data?: JwtPayload;
}
