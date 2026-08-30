import { prisma } from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

// セレクトメニューに表示するためのAPI
export const GET = async (
  request: NextRequest,
  
) => {
  try {
    const breeds = await prisma.breed.findMany({
      orderBy: {
        id: "asc",
      },
    })

    return NextResponse.json({ breeds })
  } catch (error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })

    return NextResponse.json(
      { error: "猫の種類の取得に失敗しました" },
      { status: 500 }
    )
  }
}