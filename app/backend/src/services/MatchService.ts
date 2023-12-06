import MatchModel from '../models/MatchModel';
import IMatchModel from '../Interfaces/Match/IMatchModel';
import IMatch from '../Interfaces/Match/IMatch';
import { ServiceResponse } from '../types/ServiceResponse';
import IFinishMessage from '../Interfaces/Match/IFinishMessage';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  async findAll():Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();

    return { status: 'SUCCESSFUL', data: matches };
  }

  async getMatchesInProgress(matchStatus: boolean): Promise<ServiceResponse<IMatch[]>> {
    const matchesInProgress = await this.matchModel.getMatchesInProgress(matchStatus);

    return { status: 'SUCCESSFUL', data: matchesInProgress };
  }

  async finishMatch(id: number): Promise<ServiceResponse<IFinishMessage>> {
    await this.matchModel.finishMatch(id);

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
