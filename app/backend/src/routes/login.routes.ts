import { Request, Response, Router } from 'express';
import Validations from '../middlewares/Validations';
import UsersController from '../controllers/UserController';
import { ICustomRequestUserDataToken } from '../Interfaces/User';

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
  (req: ICustomRequestUserDataToken, res: Response) => res.status(200)
    .json({ role: req.userData?.role }),
);

export default router;
