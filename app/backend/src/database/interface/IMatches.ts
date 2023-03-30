import ITeam from './ITeam';

export interface ISimpleMatch {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
}

export default interface IMatches extends ISimpleMatch{
  id?: number;
  inProgress: boolean;
}

export interface IMatchesWithNames extends IMatches {
  homeTeam: ITeam;
  awayTeam: ITeam;
}
