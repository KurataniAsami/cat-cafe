"use server";

import { prisma } from "@/libs/prisma";
import { stripe } from "@/config/stripe";

export async function createStripeSession(cartId: number) {
  const cartItems = await prisma.catCartItem.findMany({
    where: {
      cartId,
    },
    include: {
      goods: true,
    },
  });

  if (cartItems.length === 0) {
    throw new Error("カートが空です。");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    line_items: cartItems.map((item) => ({
      price_data: {
        currency: "jpy",
        product_data: {
          name: item.goods.name,
        },
        unit_amount: item.goods.price,
      },
      quantity: item.quantity,
    })),

    metadata: {
      cartId: String(cartId),
    },

    success_url: `${process.env.BASE_URL}/shop/success`,
    cancel_url: `${process.env.BASE_URL}/cart`,
  });

  if (!session.url) {
    throw new Error("決済ページの作成に失敗しました。");
  }

  return session.url;
}