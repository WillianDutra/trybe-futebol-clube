import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import Users from '../models/Users';

const router = Router();
const userService = new UserService(Users);
const userController = new UserController(userService);

router.post('/', userController.userLogin);

export default router;
