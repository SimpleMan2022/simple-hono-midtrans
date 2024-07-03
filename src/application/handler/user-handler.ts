import {UserUsecase} from "../../usecase/user-usecase";
import {Context} from "hono";
import {UserCreateInput} from "../model/user-model";
import {Helper, ResponseParams} from "../../helper/response";
import {STATUS_CODE} from "../../constant/status-code";
import {SUCCESS_MESSAGES} from "../../constant/user-constant";

export class UserHandler {
    static async GetAllUsers(c: Context) {
        const users = await UserUsecase.GetAllUsers()

        console.log(c.get("userId"))

        const param: ResponseParams = {
            status_code: STATUS_CODE.OK,
            message: SUCCESS_MESSAGES.SUCCESS_CREATE_USER,
            data: users
        }
        const response = Helper.Response(param)
        return c.json(response, {status: STATUS_CODE.OK})
    }

}