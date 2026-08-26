import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export type CreateCatRequestBody = {
  name: string
  sex: string
  birthday: string 
  breedId: number
  ImageKey?: string | null
  ImageUrl?: string | null
}

export const POST = async (request: NextRequest) => {
  try {
    const body: CreateCatRequestBody = await request.json()

    const { name, sex, breedId, birthday, ImageKey, ImageUrl } = body

    // 猫を作成した結果
    const catData = await prisma.cat.create({
      data: {
        name,
        breedId,
        sex,
        birthday,
        ImageKey,
        ImageUrl
      }
    })

    return NextResponse.json({
      id: catData.id
    })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}