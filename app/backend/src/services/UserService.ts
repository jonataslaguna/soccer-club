import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import { ServiceMessage, ServiceResponse } from '../types/ServiceResponse';
import { IToken } from '../Interfaces/IToken';
import { ILogin, IUserModel } from '../Interfaces/User';
import JWT from '../utils/JWT';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) {}

  async login({ email, password }: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const payload = {
      email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
