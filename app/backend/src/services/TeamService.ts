import ITeam from '../Interfaces/Team/ITeam';
import ITeamModel from '../Interfaces/Team/ITeamModel';
import TeamModel from '../models/TeamModel';
import { ServiceResponse } from '../types/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const dbData = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: dbData };
  }

  async findById(id:number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);

    if (team === null) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };

    return { status: 'SUCCESSFUL', data: team };
  }
}
