import * as bcrypt from "bcryptjs";
import { PasswordHasher } from "@hotel-project/domain";

const saltRounds = 10;

export const passwordService: PasswordHasher = {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  },

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  },
};
