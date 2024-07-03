import {z, ZodType} from "zod";

export class TransactionValidation {
    static readonly ITEM_SCHEMA: ZodType = z.object({
        clothes_id: z.number().int().min(1).max(10),
        quantity: z.number().int().min(1).max(10)
    });

    static readonly CREATE_TRANSACTION: ZodType = z.object({
        items: z.array(this.ITEM_SCHEMA)
    });
}