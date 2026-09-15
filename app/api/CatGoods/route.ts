import { prisma } from "@/libs/prisma"
import { CatGoods } from "@/types/cat"
import { NextRequest, NextResponse } from "next/server"

export type CatGoodsIndexResponse = {
  goods: CatGoods[]
}

export const GET = async (request: NextRequest) => {
  try {
    const goods = await prisma.catGoods.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        imageKey: true,
        imageUrl: true
      }
    })

    return NextResponse.json({ goods }, { status: 200 })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}