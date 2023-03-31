import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  public getLeaderboard = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { team } = req.params;
      const isHomeTeam = (team === 'home');
      const leaderboard = await this.leaderboardService.getLeaderboard(isHomeTeam);
      return res.status(200).json(leaderboard);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
