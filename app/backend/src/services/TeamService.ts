import ITeam from '../Interfaces/ITeam';
import IteamModel from '../Interfaces/Team/ITeamModel';
import TeamModel from '../models/TeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel: IteamModel = new TeamModel(),
  ) {}

  async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const dbData = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: dbData };
  }
}
