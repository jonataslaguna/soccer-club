import SequelizeUser from '../database/models/SequelizeUser';
import { IUser, IUserModel } from '../Interfaces/User';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user || null;
  }
}
