import { EnvParser } from "../utilies/Config";
import { logger } from "../utilies/Logger";
import jwt from "jsonwebtoken";

export class JWTMiddleware {
  static verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, EnvParser.jwt_secret);
      return decoded;
    } catch (error) {
      logger.error("Invalid token");
      throw new Error("Unauthorized");
    }
  }
  static signToken(payload: object) {
    return jwt.sign(payload, EnvParser.jwt_secret, { expiresIn: "3h" });
  }
}
