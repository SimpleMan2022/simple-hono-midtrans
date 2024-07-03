import {Context} from "hono";
import {CreateTransactionRequest} from "../model/transaction-model";
import {TransactionUsecase} from "../../usecase/transaction-usecase";
import {Helper, ResponseParams} from "../../helper/response";
import {STATUS_CODE} from "../../constant/status-code";
import {ERROR_MESSAGES, SUCCESS_MESSAGES} from "../../constant/user-constant";

export class TransactionHandler {
    static async CreateTransaction(ctx: Context){
           const userId = ctx.get("userId")
           const request: CreateTransactionRequest = await ctx.req.json() as CreateTransactionRequest
           const transaction = await TransactionUsecase.CreateTransaction(request, userId)

           const param: ResponseParams = {
               status_code: STATUS_CODE.CREATED,
               message: SUCCESS_MESSAGES.SUCCESS_CREATE_TRANSACTION,
               data: transaction
           }
           return ctx.json(Helper.Response(param), {status: STATUS_CODE.CREATED})
    }

    static async Notification(ctx: Context){
        try {
            const notification = await ctx.req.json()
            await TransactionUsecase.HandleNotfication(notification)

            const param: ResponseParams = {
                status_code: STATUS_CODE.OK,
                message: SUCCESS_MESSAGES.SUCCESS_HANDLE_NOTIFICATION
            }
            return ctx.json(Helper.Response(param), {status: STATUS_CODE.OK})
        }catch (e){
            const param: ResponseParams = {
                status_code: STATUS_CODE.BAD_REQUEST,
                message: ERROR_MESSAGES.FAILED_HANDLE_NOTIFICATION
            }
            return ctx.json(Helper.Response(param), {status: STATUS_CODE.BAD_REQUEST})
        }
    }
}