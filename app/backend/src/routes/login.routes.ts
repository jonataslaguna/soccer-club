import { Request, Response, Router } from 'express';
import Validations from '../middlewares/Validations';
import UsersController from '../controllers/UserController';
import { ICustomRequest } from '../Interfaces/User/IUserData';

const userController = new UsersController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  Validations.validateToken,
  (req: ICustomRequest, res: Response) => res.status(200)
    .json({ role: req.userData?.role }),
);

export default router;
