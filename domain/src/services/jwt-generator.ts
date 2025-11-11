import { UserRole } from "../entities";

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface TokenGenerator {
  generate(payload: TokenPayload): Promise<string>;
  verify(token: string): Promise<TokenPayload | undefined>;
}
