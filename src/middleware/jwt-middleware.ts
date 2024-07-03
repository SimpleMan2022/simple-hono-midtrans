import {Context, Next} from "hono";
import {ResponseError} from "../error/response-error";
import {HelperToken} from "../helper/token";
import {ACCESS_TOKEN} from "../constant/variable";

export const jwtMiddleware = async (ctx: Context,  next: Next) => {
    try {
        const header = await ctx.req.header('Authorization')
        if (!header) {
            throw new ResponseError(401, "Token is required")
        }
       if (!header.startsWith('Bearer ')) {
           throw new ResponseError(401, "Token is invalids")
       }

       const token = header.split(' ')[1]
       if (!token) {
           throw new ResponseError(401, "Token is invalida")
       }

        const decoded = HelperToken.VerifyAccessToken(token, ACCESS_TOKEN)
        ctx.set("userId", decoded.id)
       await next()
    }catch (error) {
        throw new ResponseError(401, "Token is invalid")
    }
}