import MatchModel from '../models/MatchModel';
import IMatchModel from '../Interfaces/Match/IMatchModel';
import IMatch from '../Interfaces/Match/IMatch';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  async findAll():Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();

    return { status: 'SUCCESSFUL', data: matches };
  }
}
