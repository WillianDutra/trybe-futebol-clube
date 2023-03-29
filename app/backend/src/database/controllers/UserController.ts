import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import UserService from '../services/UserService';
import { createToken } from '../auth/authFunctions';
import RequestWithData from '../interface/IRequest';

export default class UserController {
  constructor(private userService: UserService) {}

  public validateBody = (email: string, password: string) => email && password;

  public userLogin = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const userData = await this.userService.getUserByEmail(email);

      if (!userData || !bcrypt.compareSync(password, userData.password || '')) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = createToken(userData);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  public userRole = async (req: RequestWithData, res: Response): Promise<Response | void> => {
    try {
      const { data } = req;

      if (data) {
        const userData = await this.userService.getUserRole(data.id);
        return res.status(200).json(userData);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
