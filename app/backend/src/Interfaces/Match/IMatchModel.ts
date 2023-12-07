import IMatch from './IMatch';
import INewMatch from './INewMatch';
import IUpdateMatchGoals from './IUpdateMatchGoals';

export default interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  getMatchesInProgress(matchStatus: boolean):Promise<IMatch[]>;
  finishMatch(id:number):Promise<void>;
  findById(id:number):Promise<IMatch | null>;
  updateMachesInProgress(teamGoals: IUpdateMatchGoals, id:number):Promise<IMatch | null>;
  createMatch(match: INewMatch):Promise<IMatch> ;
}
