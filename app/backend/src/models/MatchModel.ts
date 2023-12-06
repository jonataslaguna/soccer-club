import IMatchModel from '../Interfaces/Match/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch from '../Interfaces/Match/IMatch';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;
  private teamModel = SequelizeTeam;

  async findAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }
}
