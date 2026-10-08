import Stripe from "stripe";

// インスタンス化(下記を実行するとcheckout.sessionsやcreateなどが呼び出せる)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);