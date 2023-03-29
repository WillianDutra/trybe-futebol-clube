import { Request, Response } from 'express';
import TeamsService from '../services/TeamService';

export default class TeamController {
  constructor(private teamsService: TeamsService) {}

  public getAllTeams = async (_req: Request, res: Response): Promise<void> => {
    try {
      const teams = await this.teamsService.getAllTeams();
      res.status(200).json(teams);
    } catch (error) {
      res.status(200).json(error);
    }
  };
}
