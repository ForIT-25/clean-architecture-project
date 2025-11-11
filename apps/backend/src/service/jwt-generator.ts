import * as jwt from 'jsonwebtoken';
import { TokenGenerator, TokenPayload } from '@hotel-project/domain';

export class JWTGenerator implements TokenGenerator {
  private readonly secretKey = process.env.JWT_SECRET || 'mi-clave-secreta-de-desarrollo'; 
  private readonly expiresIn = '1d';

  async generate(payload: TokenPayload): Promise<string> {
    const token = jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
    return token;
  }

  async verify(token: string): Promise<TokenPayload | undefined> {
    try {
      const payload = jwt.verify(token, this.secretKey) as TokenPayload;
      return payload;
    } catch (error) {
      return undefined;
    }
  }
}
