import ILeaderboard from '../interface/Leaderboard';

export default function sortLeaderboard(leaderboard: ILeaderboard[]) {
  return leaderboard.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      const points = a.totalPoints > b.totalPoints ? -1 : 1;
      return points;
    } if (a.totalVictories !== b.totalVictories) {
      const victories = a.totalVictories > b.totalVictories ? -1 : 1;
      return victories;
    } if (a.goalsBalance !== b.goalsBalance) {
      const balance = a.goalsBalance > b.goalsBalance ? -1 : 1;
      return balance;
    } if (a.goalsFavor !== b.goalsFavor) {
      const favor = a.goalsFavor > b.goalsFavor ? -1 : 1;
      return favor;
    }
    return 0;
  });
}
