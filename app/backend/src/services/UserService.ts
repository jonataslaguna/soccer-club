import * as bcrypt from 'bcryptjs';
import IUserModel from '../Interfaces/User/IUserModel';
import UserModel from '../models/UserModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IToken } from '../Interfaces/IToken';
import { ILogin } from '../Interfaces/User/ILogin';
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
