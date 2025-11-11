
import { PasswordHasher } from '@hotel-project/domain';
import * as bcrypt from 'bcryptjs';

export class BcryptHasher implements PasswordHasher{
  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
