import { JwtPayload, Secret, sign, SignOptions, verify } from 'jsonwebtoken';

export const extractToken = (bearerToken: string) => bearerToken.split(' ')[1];

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || '123456';

  private static jwtConfig: SignOptions = {
    expiresIn: '10d',
    algorithm: 'HS256',
  };

  static sign(payload: JwtPayload): string {
    return sign({ ...payload }, this.secret, this.jwtConfig);
  }

  static verify(token: string): JwtPayload | string {
    try {
      return verify(token, this.secret) as JwtPayload;
    } catch (error) {
      return 'Token must be a valid token';
    }
  }
}
