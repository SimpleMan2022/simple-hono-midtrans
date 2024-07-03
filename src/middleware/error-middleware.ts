import { Context } from "hono";
import { ZodError } from "zod";
import {Helper, ResponseErrorParams, ResponseParams, ResponseWithoutData} from "../helper/response";
import {STATUS_CODE} from "../constant/status-code";
import {ResponseError} from "../error/response-error";

function formattedZodError(error: ZodError) {
    return error.errors.map(err => ({
        field: err.path.join("."),
        message: err.message
    }));
}

export const ErrorMiddleware = async (err: Error, ctx: Context) => {
    if (err instanceof ZodError) {
        const format = formattedZodError(err);

        const param: ResponseErrorParams = {
            status: "Failed",
            status_code: STATUS_CODE.BAD_REQUEST,
            errors: format
        }
        return ctx.json(param, { status: STATUS_CODE.BAD_REQUEST })
    } else if (err instanceof ResponseError) {
        const param: ResponseParams = {
            status_code: err.status,
            message: err.message,
        }
        const response: ResponseWithoutData = Helper.Response(param)
        return ctx.json(response, { status: err.status });
    } else {
        const param: ResponseParams = {
            status_code: STATUS_CODE.INTERNAL_SERVER_ERROR,
            message: err.message,
        }
        const response: ResponseWithoutData = Helper.Response(param)
        return ctx.json(response, { status: STATUS_CODE.INTERNAL_SERVER_ERROR })
    }
};
