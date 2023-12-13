import { ILeaderboardMatches } from '../../Interfaces/Leaderboard';

export default class LeaderboardOverall {
  static overall(
    homeTeam: ILeaderboardMatches,
    awayTeam: ILeaderboardMatches,
  ): ILeaderboardMatches {
    return {
      totalPoints: homeTeam.totalPoints + awayTeam.totalPoints,
      totalGames: homeTeam.totalGames + awayTeam.totalGames,
      totalVictories: homeTeam.totalVictories + awayTeam.totalVictories,
      totalDraws: homeTeam.totalDraws + awayTeam.totalDraws,
      totalLosses: homeTeam.totalLosses + awayTeam.totalLosses,
      goalsFavor: homeTeam.goalsFavor + awayTeam.goalsFavor,
      goalsOwn: homeTeam.goalsOwn + awayTeam.goalsOwn,
      goalsBalance: homeTeam.goalsBalance + awayTeam.goalsBalance,
      efficiency: `${(((homeTeam.totalPoints + awayTeam.totalPoints)
           / ((homeTeam.totalGames + awayTeam.totalGames) * 3)) * 100)
        .toFixed(2)}`,
    };
  }
}
