import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  async findAll(_req:Request, res: Response) {
    const { status, data } = await this.teamService.findAll();

    res.status(mapStatusHTTP(status)).json(data);
  }

  async findById(req:Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.teamService.findById(Number(id));

    res.status(mapStatusHTTP(status)).json(data);
  }
}
