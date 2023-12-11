import { Request, Response } from 'express';
import Leaderboard from '../services/LeaderBoard';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboard = new Leaderboard(),
  ) { }

  async calculateLeaderboard(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboard.calculateLeaderboard();

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
