import {snap} from "../external/midtrans";
import {ResponseError} from "../error/response-error";
import {STATUS_CODE} from "../constant/status-code";
import {CustomerDetail, TransactionDetail} from "../application/model/transaction-model";
import crypto from "crypto-js"

export class HelperMidtrans {
    static async createTransaction(orderId: string, totalAmount: number, customerDetail: CustomerDetail, transaction_detail: TransactionDetail[]) {
        const payload = {
            transaction_details: {
                order_id: orderId,
                gross_amount: totalAmount
            },
            item_details: transaction_detail.map(item => ({
                id: item.clothesId,
                price: item.price,
                quantity: item.quantity,
                name: item.name
            })),
            customer_details: {
                first_name: customerDetail.username,
                email: customerDetail.email,
                phone: customerDetail.phone
            }
        }

        try {
            const transaction = await snap.createTransactionRedirectUrl(payload)
            return transaction
        }catch (error) {
            throw new ResponseError(STATUS_CODE.INTERNAL_SERVER_ERROR, `Midtrans Error ${error}`)
        }
    }

    static verifySignature(notification: any, serverKey: string): Boolean {
        const { order_id, status_code, gross_amount, signature_key } = notification

        const payload = order_id+status_code+gross_amount+serverKey
        const result = crypto.SHA512(payload).toString()
        return result === signature_key
    }
}