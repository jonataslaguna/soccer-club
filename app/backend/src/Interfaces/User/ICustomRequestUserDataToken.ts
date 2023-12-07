import { Request } from 'express';
import IUserDataToken from './IUserDataToken';

export default interface ICustomRequestUserDataToken extends Request {
  userData?: IUserDataToken | undefined;
}
