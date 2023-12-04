import IteamModel from '../Interfaces/Team/ITeamModel';
import ITeam from '../Interfaces/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements IteamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }
}
