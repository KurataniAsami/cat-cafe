"use server";

import Stripe from "stripe";
import { prisma } from "@/libs/prisma";

// インスタンス化(下記を実行するとcheckout.sessionsやcreateなどが呼び出せる)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createStripeSession(goodsId: number, quantity: number) {
  const goods = await prisma.catGoods.findUnique({
    where: {
      id: goodsId,
    },
  });

  if (!goods) {
    throw new Error("商品が見つかりません。");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "jpy",
          product_data: {
            name: goods.name,
          },
          unit_amount: goods.price,
        },
        quantity,
      },
    ],

    success_url: `${process.env.BASE_URL}/shop/success`,
    cancel_url: `${process.env.BASE_URL}/cart`,  // キャンセル時のリダイレクト先
  });

  if (!session.url) {
    throw new Error("決済ページの作成に失敗しました。");
  }

  return session.url;
}