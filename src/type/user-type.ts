import {HonoRequest} from "hono";
import {JWTPayload} from "hono/dist/types/utils/jwt/types";


export interface UserRequest extends HonoRequest {
    user?: Object | JWTPayload
}

