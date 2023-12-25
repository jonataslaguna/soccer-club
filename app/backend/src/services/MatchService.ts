import MatchModel from '../models/MatchModel';
import { IMatch, IMatchModel, IMessage, INewMatch, IUpdateMatchGoals } from '../Interfaces/Match';
import { ServiceResponse } from '../types/ServiceResponse';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: TeamModel = new TeamModel(),
  ) {}

  async findAll():Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();

    return { status: 'SUCCESSFUL', data: matches };
  }

  async getMatchesInProgress(matchStatus: boolean): Promise<ServiceResponse<IMatch[]>> {
    const matchesInProgress = await this.matchModel.getMatchesInProgress(matchStatus);

    return { status: 'SUCCESSFUL', data: matchesInProgress };
  }

  async finishMatch(id: number): Promise<ServiceResponse<IMessage>> {
    await this.matchModel.finishMatch(id);

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updateMachesInProgress(
    teamGoals: IUpdateMatchGoals,
    id:number,
  ):Promise<ServiceResponse<IMatch | null>> {
    const match = await this.matchModel.findById(id);

    if (!match) return { status: 'NOT_FOUND', data: { message: 'Match not found' } };

    const updatedMatch = await this.matchModel.updateMachesInProgress(teamGoals, id);

    return { status: 'SUCCESSFUL', data: updatedMatch };
  }

  async createMatch(match: INewMatch): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = match;

    if (homeTeamId === awayTeamId) {
      return {
        status: 'UNPROCESSABLE CONTENT',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    const findHomeTeam = await this.teamModel.findById(homeTeamId);
    const findAwayTeam = await this.teamModel.findById(awayTeamId);

    if (!findHomeTeam || !findAwayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchModel.createMatch(match);

    return { status: 'CREATED', data: newMatch };
  }
}
