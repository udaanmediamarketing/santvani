// src/utils/jwt.ts
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables.");
}
export const signToken = (payload, expiresIn = "7d") => {
    const options = { expiresIn };
    return jwt.sign(payload, JWT_SECRET, options);
};
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch {
        return null;
    }
};
//# sourceMappingURL=jwt.js.map