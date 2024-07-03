import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import {userRouter} from "./router/user-router";
import {authRouter} from "./router/auth-router";
import {ErrorMiddleware} from "./middleware/error-middleware";
import {transactionRouter} from "./router/transaction-router";

const app = new Hono()

app.route("/api/v1/users", userRouter)
app.route("/api/v1/auth/", authRouter)
app.route("/api/v1/transactions", transactionRouter)

app.onError(ErrorMiddleware)

const port = 3000
console.log(`Server is running on ports ${port}`)

serve({
  fetch: app.fetch,
  port
})
