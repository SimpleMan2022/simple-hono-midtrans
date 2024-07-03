import {Context} from "hono";
import {UserCreateInput, UserLoginRequest} from "../model/user-model";
import {UserUsecase} from "../../usecase/user-usecase";
import {AuthUsecase} from "../../usecase/auth-usecase";
import {Helper, ResponseParams} from "../../helper/response";
import {STATUS_CODE} from "../../constant/status-code";
import {SUCCESS_MESSAGES} from "../../constant/user-constant";

export class AuthHandler {
    static async Register(c: Context) {
        const user:UserCreateInput = await c.req.json() as UserCreateInput
        await AuthUsecase.Register(user)

        const param: ResponseParams = {
            status_code: STATUS_CODE.CREATED,
            message: SUCCESS_MESSAGES.SUCCESS_CREATE_USER,
        }

        return c.json(Helper.Response(param), {status: STATUS_CODE.CREATED})
    }

    static async Login(c: Context) {
        const user = await c.req.json() as UserLoginRequest
        const token = await AuthUsecase.Login(user)

        const param: ResponseParams = {
            status_code: STATUS_CODE.OK,
            message: SUCCESS_MESSAGES.SUCCESS_LOGIN,
            data: {
                access_token: token.access_token
            }
        }

        return c.json(Helper.Response(param), {status: STATUS_CODE.OK})
    }
}