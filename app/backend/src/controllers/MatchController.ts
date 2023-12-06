import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  async findAll(_req:Request, res: Response) {
    const { status, data } = await this.matchService.findAll();

    res.status(mapStatusHTTP(status)).json(data);
  }

  async getMatchesInProgress(req:Request, res: Response) {
    const { inProgress } = req.query;

    const matchStatus = inProgress === 'true';

    const { status, data } = await this.matchService.getMatchesInProgress(matchStatus);
    res.status(mapStatusHTTP(status)).json(data);
  }
}