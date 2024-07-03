export type CreateTransactionRequest = {
    items: TransactionDetailRequest[]
}

export type TransactionDetailRequest = {
    clothes_id: number,
    quantity: number
}

export type TranssactionResponse = {
    snap_url: string
}

export type CustomerDetail = {
    username: string;
    email: string;
    phone: string;
}

export type TransactionDetail = {
    clothesId: number;
    price: number;
    quantity: number;
    name: string;
}