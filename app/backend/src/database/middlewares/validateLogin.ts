import { NextFunction, Request, Response } from 'express';

export default function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const validateEmail = (userEmail: string):boolean => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{3}$/g;
    return regex.test(userEmail);
  };

  if (!validateEmail(email) || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
}
