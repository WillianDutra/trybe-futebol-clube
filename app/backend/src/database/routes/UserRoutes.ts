import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import Users from '../models/Users';

import validateLogin from '../middlewares/validateLogin';

const router = Router();
const userService = new UserService(Users);
const userController = new UserController(userService);

router.post('/', validateLogin, userController.userLogin);

export default router;
