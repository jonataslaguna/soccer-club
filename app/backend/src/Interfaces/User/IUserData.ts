import { Request } from 'express';

export interface IUserData {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface ICustomRequest extends Request {
  userData?: IUserData | undefined;
}
