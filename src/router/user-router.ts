import {Hono} from "hono";
import {UserHandler} from "../application/handler/user-handler";
import {jwtMiddleware} from "../middleware/jwt-middleware";

export const userRouter = new Hono()
userRouter.use(jwtMiddleware)
userRouter.get("/", UserHandler.GetAllUsers)