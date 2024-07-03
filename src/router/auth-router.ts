import {Hono} from "hono";
import {AuthHandler} from "../application/handler/auth-handler";

export const authRouter = new Hono()

authRouter.post("/register", AuthHandler.Register)
authRouter.post("/login", AuthHandler.Login)