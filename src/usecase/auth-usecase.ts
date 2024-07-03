import {UserCreateInput, UserLoginRequest, UserLoginResponse} from "../application/model/user-model";
import {Validation} from "../validation/validation";
import {UserValidation} from "../validation/user-validation";
import {client} from "../application/database";
import {ResponseError} from "../error/response-error";
import bcrypt from "bcryptjs";
import {HelperToken} from "../helper/token";
import {STATUS_CODE} from "../constant/status-code";

export class AuthUsecase {
    static async Register(user: UserCreateInput): Promise<void> {
        const userRequest: UserCreateInput = Validation.validate(user, UserValidation.REGISTER)

        const isExist = await client.from("users").select("*").eq("username", userRequest.username).single()

        if (isExist.data) {
            throw new ResponseError(STATUS_CODE.BAD_REQUEST, "Username already exist")
        }

        user.password = await bcrypt.hash(user.password, 10)

        const {error} = await client.from("users").insert(user).single()

        if (error) {
            throw new ResponseError(500, error.message)
        }
    }

    static async Login(user: UserLoginRequest): Promise<UserLoginResponse> {
        const userRequest: UserLoginRequest = Validation.validate(user, UserValidation.LOGIN)

        const {data, error} = await client.from("users").select("*").eq("username", userRequest.username).single()

        if (error) {
            throw new ResponseError(500, error.message)
        }

        if (!data) {
            throw new ResponseError(400, "Username or password is invalid")
        }

        const isMatch = await bcrypt.compare(userRequest.password, data.password)

        if (!isMatch) {
            throw new ResponseError(400, "Username or password is invalid")
        }

        const accessToken = HelperToken.GenerateAccessToken({id: data.id, name: data.username})
        const refreshToken = HelperToken.GenerateRefreshToken({name: data.username})

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }
}