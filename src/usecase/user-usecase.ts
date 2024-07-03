import {User, UserCreateInput} from "../application/model/user-model";
import {client} from "../application/database";
import bcrypt from "bcryptjs"
import {ResponseError} from "../error/response-error";
import {Validation} from "../validation/validation";
import {UserValidation} from "../validation/user-validation";

export class UserUsecase {
    static async GetAllUsers(): Promise<User[]> {
        const {data, error} = await client.from("users").select(`id, username, email, phone`)

        if (error) {
            throw new ResponseError(500, error.message)
        }

         return data?.map((user) => {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                phone: user.phone
            }
         })
    }

}