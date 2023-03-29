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
