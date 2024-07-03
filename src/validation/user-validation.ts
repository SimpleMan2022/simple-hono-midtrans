import {z, ZodType} from "zod";

export class UserValidation {
    static readonly REGISTER: ZodType  = z.object({
        username: z.string().min(3).max(16),
        email: z.string().email(),
        phone: z.string().min(10).max(13),
        password: z.string().min(8).max(100)
    })

    static readonly LOGIN: ZodType  = z.object({
        username: z.string().min(3).max(16),
        password: z.string().min(8).max(100)
    })

    static readonly CREATE_TRANSACTION: ZodType  = z.object({
        clothes_id: z.number().int().min(1).max(3),
        quantity: z.number().int().min(1).max(3)
    })

}