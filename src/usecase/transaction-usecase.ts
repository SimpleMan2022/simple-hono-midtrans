import {CreateTransactionRequest, CustomerDetail, TranssactionResponse} from "../application/model/transaction-model";
import {client} from "../application/database";
import {ResponseError} from "../error/response-error";
import {STATUS_CODE} from "../constant/status-code";
import {HelperMidtrans} from "../helper/midtrans";
import {MIDTRANS} from "../constant/midtrans";
import {Validation} from "../validation/validation";
import {TransactionValidation} from "../validation/transaction-validation";

export class TransactionUsecase {
    static async CreateTransaction(request: CreateTransactionRequest, userId: number ): Promise<TranssactionResponse> {
        const validateRequest = Validation.validate(request, TransactionValidation.CREATE_TRANSACTION)
        const {items} = validateRequest

        const clothesIds = items.map((item) => item.clothes_id)
        const {data: clothesData, error:clothesError} = await client.from("clothes").select("*").in("id", clothesIds)

        if (clothesError) {
            throw new ResponseError(STATUS_CODE.INTERNAL_SERVER_ERROR, clothesError.message)
        }

        if (clothesData.length !== items.length) {
            throw new ResponseError(STATUS_CODE.BAD_REQUEST, "Clothes not found")
        }

        let total: number = 0
        for (let i = 0; i < clothesData.length; i++) {
            const clothes = clothesData[i]
            const item = items.find((it) => it.clothes_id === clothes.id);

            if (!item) {
                throw new ResponseError(STATUS_CODE.BAD_REQUEST, "Clothes not found")
            }

            if (clothes.stock < item.quantity) {
                throw new ResponseError(STATUS_CODE.BAD_REQUEST, `Stock ${clothes.name} kurang`)
            }
            total += clothes.price * item.quantity
            console.log(clothes.id, clothes.price, item.quantity, total)
        }

        const {data, error} = await client.from("transaction").insert({
            userId: userId,
            total: total,
            status: "pending",
        }).select()

        if (error) {
            throw new ResponseError(STATUS_CODE.INTERNAL_SERVER_ERROR, error.message)
        }

        const transactionId = data[0].id
        const transactionDetails = items.map(item => ({
            transactionId: transactionId,
            clothesId: item.clothes_id,
            quantity: item.quantity,
            price: clothesData.find(c => c.id === item.clothes_id).price,
        }));
        const {error: errorDetail} = await client.from("transaction_detail").insert(transactionDetails)

        if (errorDetail) {
            throw new ResponseError(STATUS_CODE.INTERNAL_SERVER_ERROR, errorDetail.message)
        }

        const {data: userData, error: userError} = await client.from("users").select(`username, email, phone`).eq("id", userId)

        if (userError) {
            throw new ResponseError(STATUS_CODE.INTERNAL_SERVER_ERROR, userError.message)
        }
        const transaction_details = items.map(item => ({
            transactionId: transactionId,
            clothesId: item.clothes_id,
            quantity: item.quantity,
            price: clothesData.find(c => c.id === item.clothes_id).price,
            name: clothesData.find(c => c.id === item.clothes_id)?.name || 'Unknown'
        }));
        console.log(total)
        const midtransTransaction = await HelperMidtrans.createTransaction(transactionId, total, userData[0] ,transaction_details)
        console.log(midtransTransaction)
        return {
            snap_url: midtransTransaction
        }
    }

    static async HandleNotfication(notification: any){
        if(!HelperMidtrans.verifySignature(notification, MIDTRANS.SERVER_KEY)) {
            throw new ResponseError(STATUS_CODE.BAD_REQUEST, "Invalid signature key")
        }

        const {order_id, transaction_status} = notification
        if (transaction_status === 'settlement' || transaction_status === 'capture') {
            await client.from('transaction').update({ status: 'sukses' }).eq('id', order_id);
        } else if (transaction_status === 'pending') {
            await client.from('transaction').update({ status: 'pending' }).eq('id', order_id);
        } else if (transaction_status === 'expire' || transaction_status === 'cancel') {
            await client.from('transaction').update({ status: 'gagal' }).eq('id', order_id);
        }
    }
}