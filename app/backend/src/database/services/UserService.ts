import { IUserData } from '../interface/IUser';
import Users from '../models/Users';

export default class UserService {
  constructor(private usersModel = Users) {}

  public async getUserByEmail(email: string): Promise<IUserData | null> {
    return this.usersModel.findOne({ where: { email } });
  }
}
