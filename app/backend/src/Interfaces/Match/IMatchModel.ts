import IMatch from './IMatch';
import IUpdateMaches from './IUpdateMaches';

export default interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  getMatchesInProgress(matchStatus: boolean):Promise<IMatch[]>;
  finishMatch(id:number):Promise<void>;
  findById(id:number):Promise<IMatch | null>;
  updateMachesInProgress(teams: IUpdateMaches, id:number):Promise<IMatch | null>;
}
