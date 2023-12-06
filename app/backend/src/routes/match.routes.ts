import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => (
    req.query.inProgress
      ? matchController.getMatchesInProgress(req, res)
      : matchController.findAll(req, res)),
);

export default router;
