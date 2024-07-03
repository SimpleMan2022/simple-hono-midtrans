import {Midtrans} from "midtrans-client-typescript";
import {MIDTRANS} from "../constant/midtrans";

export const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: MIDTRANS.SERVER_KEY,
  clientKey: MIDTRANS.CLIENT_KEY
})