import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import UserService from '../services/UserService';
import { createToken } from '../auth/authFunctions';

export default class UserController {
  constructor(private userService: UserService) {}

  public validateBody = (email: string, password: string) => email && password;

  public userLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!this.validateBody(email, password)) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }

      const userData = await this.userService.getUserByEmail(email);

      if (!userData || !bcrypt.compareSync(password, userData.password || '')) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = createToken(userData);
      return res.status(200).json({ token });
    } catch (error) {
      res.status(500).json(error);
    }
  };
}
