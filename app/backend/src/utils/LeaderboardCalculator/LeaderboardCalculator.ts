import { ILeaderboardMatches } from '../../Interfaces/Leaderboard';
import { IMatch } from '../../Interfaces/Match';

export default class LeaderBoardCalculator {
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

  static reduceTeamMatchesStats(teamMatches: IMatch[], isHomeTeam: boolean): ILeaderboardMatches {
    return teamMatches.reduce((acc, curr) => {
      const points = LeaderBoardCalculator
        .calculateMatchPoints(curr.homeTeamGoals, curr.awayTeamGoals, isHomeTeam);
      return {
        ...acc,
        totalPoints: acc.totalPoints + points,
        totalGames: teamMatches.length,
        totalVictories: acc.totalVictories + (points === 3 ? 1 : 0),
        totalDraws: acc.totalDraws + (points === 1 ? 1 : 0),
        totalLosses: acc.totalLosses + (points === 0 ? 1 : 0),
        goalsFavor: acc.goalsFavor + (isHomeTeam ? curr.homeTeamGoals : curr.awayTeamGoals),
        goalsOwn: acc.goalsOwn + (isHomeTeam ? curr.awayTeamGoals : curr.homeTeamGoals),
        goalsBalance: acc.goalsBalance + (isHomeTeam ? curr.homeTeamGoals - curr.awayTeamGoals
          : curr.awayTeamGoals - curr.homeTeamGoals),
        efficiency: `${(((acc.totalPoints + points) / (acc.totalGames * 3)) * 100).toFixed(2)}`,
      };
    }, LeaderBoardCalculator.initialLeaderboard);
  }

  static calculateMatchPoints(
    homeTeam: number,
    awayTeam: number,
    isHomeTeam: boolean,
  ): number {
    if (isHomeTeam) {
      if (homeTeam > awayTeam) return 3;
      if (homeTeam < awayTeam) return 0;
    }
    if (awayTeam > homeTeam) return 3;
    if (awayTeam < homeTeam) return 0;
    return 1;
  }
}
