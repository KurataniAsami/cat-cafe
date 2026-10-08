
import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { cartId } = await request.json();

    const cartItems = await prisma.catCartItem.findMany({
      where: {
        cartId,
      },
      include: {
        goods: true,
      },
    });

    if (cartItems.length === 0) {
      return NextResponse.json(
        { message: "カートが空です" },
        { status: 400 }
      );
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cartItems.map((item) => ({
        price_data: {
          currency: "jpy",
          product_data: {
            name: item.goods.name,
          },
          unit_amount: item.goods.price,
        },
        quantity: item.quantity,
      }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,

      metadata: {
        cartId: String(cartId),
      },

      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/cart`,
    });

    return NextResponse.json({
      url: session.url,
    });

  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.json(
      { message: "決済ページの作成に失敗しました" },
      { status: 500 }
    );
  }
}

// npm i stripe -D