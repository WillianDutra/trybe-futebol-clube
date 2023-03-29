import IMatches from '../interface/IMatches';
import Matches from '../models/Matches';
import Teams from '../models/Teams';

export default class MatchesSerivice {
  constructor(private matchesModel = Matches) {}

  public async getAllMatches(): Promise<IMatches[]> {
    return this.matchesModel.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
  }

  public async getFilteredMatches(matchProgress: boolean): Promise<IMatches[]> {
    return this.getAllMatches().then((matches) => matches
      .filter((match) => match.inProgress === matchProgress));
  }

  public async finhishMatch(id: number): Promise<number> {
    const [affected] = await this.matchesModel.update({ inProgress: false }, { where: { id } });
    return affected;
  }

  public async updateMatch(id: number, homeTeam: number, awayTeam: number): Promise<number> {
    const [affected] = await this.matchesModel
      .update({ homeTeamGoals: homeTeam, awayTeamGoals: awayTeam }, { where: { id } });
    return affected;
  }
}
