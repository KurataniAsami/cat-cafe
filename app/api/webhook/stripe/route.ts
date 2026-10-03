import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body, sig, process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return new Response('Webhook Error', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // Supabaseに購入記録を保存
    // await supabase.from('purchases').insert({
    //   user_id: session.metadata?.userId,
    //   stripe_session_id: session.id,
    // })
  }

  return new Response('OK')
}