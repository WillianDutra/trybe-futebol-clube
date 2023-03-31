import Teams from '../models/Teams';
import Matches from '../models/Matches';
import Leaderboard from '../Leaderboard';

export default class LeaderboardService {
  constructor(private matchesModel = Matches, private teamsService = Teams) {}

  public async getLeaderboard(isHome: boolean) {
    const allMatches = await this.matchesModel.findAll()
      .then((matches) => matches.filter((match) => match.inProgress === false));
    const allTeams = await this.teamsService.findAll();

    const leaderboard = allTeams.map((team) => {
      const filteredMatchs = allMatches
        .filter((match) => team.id === (isHome ? match.homeTeamId : match.awayTeamId));

      const teamStatus = new Leaderboard(filteredMatchs, team, isHome);
      return teamStatus.getTeamInfos();
    });

    return leaderboard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      return 1;
    });
  }
}
