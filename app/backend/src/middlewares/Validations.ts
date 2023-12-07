import { NextFunction, Request, Response } from 'express';
import JWT, { extractToken } from '../utils/JWT';
import { ICustomRequestUserDataToken, IUserDataToken } from '../Interfaces/User';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static async validateToken(req: ICustomRequestUserDataToken, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = extractToken(authorization);
    const validToken = JWT.verify(token);

    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }

    req.userData = validToken as IUserDataToken;

    next();
  }
}

export default Validations;
