import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatch, IMatchModel, IUpdateMatchGoals, INewMatch } from '../Interfaces/Match';

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

  async getMatchesInProgress(matchStatus: boolean): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: { inProgress: matchStatus },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  async findById(id: number): Promise<IMatch | null> {
    const match = await this.model.findOne({
      where: { id },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return match;
  }

  async updateMachesInProgress(teamGoals: IUpdateMatchGoals, id:number):Promise<IMatch | null> {
    const { homeTeamGoals, awayTeamGoals } = teamGoals;
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    const updatedMatch = await this.findById(id);

    return updatedMatch;
  }

  async createMatch(match: INewMatch):Promise<IMatch> {
    const matchAdded = {
      ...match,
      inProgress: true,
    };

    const newMatch = await this.model.create(matchAdded);

    return newMatch;
  }
}
