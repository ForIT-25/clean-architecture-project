import * as jwt from "jsonwebtoken";
import { TokenGenerator, TokenPayload } from "@hotel-project/domain";

const secretKey =
  process.env.JWT_SECRET || "mi-clave-secreta-de-desarrollo";
const expiresIn = "1d";

export const jwtService: TokenGenerator = {
  async generate(payload: TokenPayload): Promise<string> {
    return jwt.sign(payload, secretKey, { expiresIn });
  },

  async verify(token: string): Promise<TokenPayload | undefined> {
    try {
      const payload = jwt.verify(token, secretKey) as TokenPayload;
      return payload;
    } catch {
      return undefined;
    }
  },
};
