import ITeam from './ITeam';

export default interface IteamModel {
  findAll(): Promise<ITeam[]>;
}
