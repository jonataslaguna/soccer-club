import { Request, Response } from 'express';
import Leaderboard from '../services/LeaderBoard';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboard = new Leaderboard(),
  ) { }

  async getLeaderboard(req: Request, res: Response): Promise<Response> {
    const isHomeTeam = req.path === '/home';

    const { status, data } = await this.leaderboard.calculateLeaderboard(isHomeTeam);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
