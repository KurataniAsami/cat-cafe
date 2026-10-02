
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);

export async function POST() {
  // ① カート取得
  const cartItems = await prisma.catCartItem.findMany({
    where: {
      cartId: 1,
    },
    include: {
      goods: true,
    },
  });

  // ② カートが空なら終了
  if (cartItems.length === 0) {
    return NextResponse.json(
      { message: "カートが空です" },
      { status: 400 }
    );
  }

  // ③ Stripe用データ作成
  const lineItems = cartItems.map((item) => ({
  price_data: {
    currency: "jpy",
    product_data: {
      name: item.goods.name,
    },
    unit_amount: item.goods.price,
  },
  quantity: item.quantity,
  // Stripeタイプに変換
}));

  // ④ Stripe Session作成
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "...",
    cancel_url: "...",
  });

  // ⑤ URL返却
  return NextResponse.json({
    url: session.url,
  });
}

// 
export async function POST() {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "jpy",
          product_data: {
            name: "猫グッズ",
          },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  return Response.json({
    url: session.url,
  });
}

// npm i stripe -D