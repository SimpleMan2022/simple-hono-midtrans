import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constant/variable";
import jwt from "jsonwebtoken";
import {JWTPayload} from "hono/dist/types/utils/jwt/types";

export class HelperToken {
    static GenerateAccessToken(payload: object): string {
        return jwt.sign(payload, ACCESS_TOKEN, {expiresIn: "1h"})
    }

    static GenerateRefreshToken(payload: object): string {
        return jwt.sign(payload, REFRESH_TOKEN, {expiresIn: "1d"})
    }

    static VerifyAccessToken(token: string, secret: string): JWTPayload {
     return jwt.verify(token, secret) as JWTPayload
    }
}