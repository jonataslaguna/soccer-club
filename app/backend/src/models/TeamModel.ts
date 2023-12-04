import ITeamModel from '../Interfaces/Team/ITeamModel';
import ITeam from '../Interfaces/Team/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }
}
