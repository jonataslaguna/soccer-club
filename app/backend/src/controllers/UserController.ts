import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  async login(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.userService.login(req.body);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
