import { Request, Response } from 'express';
import MatchesSerivice from '../services/MatchesService';
import TeamService from '../services/TeamService';

export default class MatchesController {
  constructor(
    private matchesService: MatchesSerivice,
    private teamsService: TeamService,
  ) {}

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

  public createMatch = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { homeTeamId, awayTeamId } = req.body;
      const matchData = req.body;

      if (homeTeamId === awayTeamId) {
        return res.status(422)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }

      const teamsIds = await this.teamsService.getAllTeams()
        .then((teams) => teams.map((team) => team.id));
      if (![homeTeamId, awayTeamId].every((id) => teamsIds.includes(id))) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }

      const result = await this.matchesService.createMatch(matchData);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
