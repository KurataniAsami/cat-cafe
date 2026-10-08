// import Stripe from 'stripe'
import { stripe } from "@/config/stripe";
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET() {
  return Response.json({ message: "webhook route exists" });
}

export async function POST(request: Request) {
  let event;

  const body = await request.text();

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if(endpointSecret) {
    const sig = request.headers.get('stripe-signature')!;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch {
      return new NextResponse('Webhook Error', { status: 400 })
    }
  }

  if (!event) {
    return new NextResponse("Webhook Event Error", { status: 500 })
  }

  // WebhookでcartIdを取り出す
  if (event.type === "checkout.session.completed") {
  const session = event.data.object;

  const cartId = Number(session.metadata?.cartId)

  if (!cartId) {
    return new Response("cartId is missing", { status: 400 })
  }

  // カート商品を取得
  const cartItems = await prisma.catCartItem.findMany({
    where: {
      cartId,
    },
    include: {
      goods: true,
    },
  })

  // 注文作成
  await prisma.catOrder.create({
    data: {
      items: {
        create: cartItems.map((item) => ({
          goodsId: item.goodsId,
          quantity: item.quantity,
          price: item.goods.price,
        })),
      },
    },
  })

  // カートを削除
  await prisma.catCartItem.deleteMany({
    where: {
      cartId,
    },
  })
}

  return new Response('OK')
}

// Stripeダッシュボードから開発者 → Webhook
// イベント → checkout.session.completed
// 送信先名: cat-cafe-checkout
// Stripe CLIをインストール

// ログイン (コマンド） stripe login
// 認証が終わったら(コマンド) stripe listen --forward-to localhost:3000/api/webhook/stripe

// 再起動で別タブで（コマンド）↓
// stripe listen --all-thin --forward-to localhost:3000/api/webhook

// Ready!が表示されたら成功
// whsec...を.envに設定

// Stripe CLI の待受を開始する

//  Get-ChildItem prisma\migrations（コマンド）から