import { Request, Response } from 'express';
import TeamsService from '../services/TeamService';

export default class TeamController {
  constructor(private teamsService: TeamsService) {}

  public getAllTeams = async (_req: Request, res: Response): Promise<void> => {
    try {
      const teams = await this.teamsService.getAllTeams();
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  public getTeamById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const team = await this.teamsService.getTeamById(Number(id));
      res.status(200).json(team);
    } catch (error) {
      res.status(500).json(error);
    }
  };
}
