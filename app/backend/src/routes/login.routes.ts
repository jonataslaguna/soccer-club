import { Router } from 'express';
import Validations from '../middlewares/Validations';
import UsersController from '../controllers/UserController';

const userController = new UsersController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  (req, res) => userController.login(req, res),
);

router.get(
  '/role',
  Validations.validateToken,
  (req, res) => res.status(200)
    .json({ role: req.body.role }),
);

export default router;
