import { Request, Response, Router } from 'express';
import Validations from '../middlewares/Validations';
import UsersController from '../controllers/UserController';

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
  (req: Request, res: Response) => res.status(200)
    .json({ role: req.body.role }),
);

export default router;
