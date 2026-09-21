import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
  try {
    const cartItems = await prisma.catCartItem.findMany({
    where: {
      cartId: 1,
    },
    include: {
      goods: true,
    },
  })

    return NextResponse.json({ cartItems }, { status: 200 })

  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}