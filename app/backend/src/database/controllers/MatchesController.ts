import { Request, Response } from 'express';
import MatchesSerivice from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService: MatchesSerivice) {}

  public getAllMatches = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        const boolean = (inProgress === 'true');
        const filtered = await this.matchesService.getFilteredMatches(boolean);
        return res.status(200).json(filtered);
      }

      const matches = await this.matchesService.getAllMatches();
      return res.status(200).json(matches);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  public finishMatch = async (req: Request, res:Response): Promise<Response> => {
    try {
      const { id } = req.params;

      await this.matchesService.finhishMatch(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  public updateMatch = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      await this.matchesService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
      return res.status(200).json({ message: 'Updated' });
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
