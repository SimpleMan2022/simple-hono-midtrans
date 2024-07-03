import {Hono} from "hono";
import {TransactionHandler} from "../application/handler/transaction-handler";
import {jwtMiddleware} from "../middleware/jwt-middleware";
import {ErrorMiddleware} from "../middleware/error-middleware";

export const transactionRouter = new Hono()
transactionRouter.post("/notification", TransactionHandler.Notification)

transactionRouter.use(jwtMiddleware)
transactionRouter.post("/", TransactionHandler.CreateTransaction)
