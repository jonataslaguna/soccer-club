import { Request, Response } from 'express';
import Leaderboard from '../services/LeaderBoard';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboard = new Leaderboard(),
  ) { }

  async getLeaderboardFiltered(req: Request, res: Response): Promise<Response> {
    const isHomeTeam = req.path;

    const { status, data } = await this.leaderboard.getLeaderboardFiltered(isHomeTeam);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getLeaderboardOverall(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboard.getOverallLeaderboard();

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
