import ITeam from '../interface/ITeam';
import Teams from '../models/Teams';

export default class TeamService {
  constructor(private teamsModel = Teams) {}

  public async getAllTeams(): Promise<ITeam[]> {
    return this.teamsModel.findAll();
  }

  public async getTeamById(id: number): Promise<ITeam | null> {
    return this.teamsModel.findByPk(id);
  }
}
