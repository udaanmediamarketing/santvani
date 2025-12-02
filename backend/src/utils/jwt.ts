// src/utils/jwt.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || "secret";

/**
 * Sign a JWT token
 * @param payload - The payload to encode in the token
 * @param expiresIn - Expiration time (default: "7d")
 */
export const signToken = (
  payload: object,
  expiresIn: jwt.SignOptions['expiresIn'] = "7d" // ✅ Type fixed here
): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Verify a JWT token
 * @param token - JWT token string
 * @returns Decoded payload if valid, otherwise null
 */
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    console.error("❌ JWT verification failed:", err);
    return null;
  }
};
