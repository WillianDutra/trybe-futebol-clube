export interface IUserLogin {
  email: string;
  password?: string;
}

export interface IUserData extends IUserLogin{
  id?: number;
  username: string;
  role: string;
}
