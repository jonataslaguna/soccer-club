import { ILeaderboardMatches, ILeaderboard } from '../Interfaces/Leaderboard';
import { ServiceResponse } from '../types/ServiceResponse';
import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/Match';
import TeamModel from '../models/TeamModel';
import LeaderBoardCalculator from '../utils/LeaderboardCalculator/LeaderboardCalculator';
import SortLeaderboard from '../utils/LeaderboardCalculator/SortLeaderboard';
import LeaderboardOverall from '../utils/LeaderboardCalculator/LeaderboardOverall';

export default class Leaderboard {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: TeamModel = new TeamModel(),
  ) {}

  private async getLeaderboardBase(type: string): Promise<ServiceResponse<ILeaderboard[]>> {
    const teams = await this.teamModel.findAll();
    const teamsStats = await Promise.all(teams.map(async (team) => {
      if (type === '/home' || type === '/away') {
        const teamType = type === '/home';
        const matches = await this.getCalculateTeamMatchesStats(team.id, teamType);
        return { name: team.teamName, ...matches };
      }
      const homeTeam = await this.getTeamMatchStatistics(team.id, true);
      const awayTeam = await this.getTeamMatchStatistics(team.id, false);
      const overall = LeaderboardOverall.overall(homeTeam, awayTeam);
      return { name: team.teamName, ...overall };
    }));
    const ordenedLeaderboard = SortLeaderboard.sortLeaderboard(teamsStats);
    return { status: 'SUCCESSFUL', data: ordenedLeaderboard };
  }

  async getLeaderboardFiltered(isHomeTeam: string): Promise<ServiceResponse<ILeaderboard[]>> {
    return this.getLeaderboardBase(isHomeTeam);
  }

  async getOverallLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    return this.getLeaderboardBase('/overall');
  }

  private async getTeamMatchStatistics(
    teamId: number,
    isHomeTeam: boolean,
  ): Promise<ILeaderboardMatches> {
    const match = await this.matchModel.findAllTeams(teamId, isHomeTeam);
    return LeaderBoardCalculator.reduceTeamMatchesStats(match, isHomeTeam);
  }

  private async getCalculateTeamMatchesStats(
    teamId: number,
    isHomeTeam: boolean,
  ): Promise<ILeaderboardMatches> {
    const teamMatches = await this.matchModel.findAllTeams(teamId, isHomeTeam);
    return LeaderBoardCalculator.reduceTeamMatchesStats(teamMatches, isHomeTeam);
  }
}
