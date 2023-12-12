import { ILeaderboardMatches, ILeaderboard } from '../Interfaces/Leaderboard';
import { ServiceResponse } from '../types/ServiceResponse';
import MatchModel from '../models/MatchModel';
import { IMatch, IMatchModel } from '../Interfaces/Match';
import TeamModel from '../models/TeamModel';

export default class Leaderboard {
  private static initialLeaderboard: ILeaderboardMatches = {
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  };

  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: TeamModel = new TeamModel(),
    private isHomeTeam: boolean = false,
  ) {}

  async calculateLeaderboard(isHomeTeam: boolean): Promise<ServiceResponse<ILeaderboard[]>> {
    this.isHomeTeam = isHomeTeam;
    const teams = await this.teamModel.findAll();
    const teamsStats = await Promise.all(teams.map(async (team) => {
      const matches = await this.calculateTeamMatchesStats(team.id);
      return { name: team.teamName, ...matches };
    }));
    const returnOfTheLeaderboard = Leaderboard.sortLeaderboard(teamsStats);
    return { status: 'SUCCESSFUL', data: returnOfTheLeaderboard };
  }

  private async calculateTeamMatchesStats(teamId: number): Promise<ILeaderboardMatches> {
    const teamMatches = await this.matchModel.findAllTeams(teamId, this.isHomeTeam);
    const calculatedTeamStats = this.reduceTeamMatchesStats(teamMatches);
    return calculatedTeamStats;
  }

  private reduceTeamMatchesStats(teamMatches: IMatch[]): ILeaderboardMatches {
    return teamMatches.reduce((acc, curr) => {
      const points = this.calculateMatchPoints(curr.homeTeamGoals, curr.awayTeamGoals);
      return {
        ...acc,
        totalPoints: acc.totalPoints + points,
        totalGames: teamMatches.length,
        totalVictories: acc.totalVictories + (points === 3 ? 1 : 0),
        totalDraws: acc.totalDraws + (points === 1 ? 1 : 0),
        totalLosses: acc.totalLosses + (points === 0 ? 1 : 0),
        goalsFavor: acc.goalsFavor + (this.isHomeTeam ? curr.homeTeamGoals : curr.awayTeamGoals),
        goalsOwn: acc.goalsOwn + (this.isHomeTeam ? curr.awayTeamGoals : curr.homeTeamGoals),
        goalsBalance: acc.goalsBalance + (this.isHomeTeam ? curr.homeTeamGoals - curr.awayTeamGoals
          : curr.awayTeamGoals - curr.homeTeamGoals),
        efficiency: `${(((acc.totalPoints + points) / (acc.totalGames * 3)) * 100).toFixed(2)}`,
      };
    }, Leaderboard.initialLeaderboard);
  }

  private calculateMatchPoints(homeTeam: number, awayTeam: number): number {
    if (this.isHomeTeam) {
      if (homeTeam > awayTeam) return 3;
      if (homeTeam < awayTeam) return 0;
    }
    if (awayTeam > homeTeam) return 3;
    if (awayTeam < homeTeam) return 0;
    return 1;
  }

  private static sortLeaderboard(leaderboard: ILeaderboard[]): ILeaderboard[] {
    return leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);
  }
}
