import { prisma } from "@/libs/prisma"
import { CatList } from "@/types/cat"
import { NextRequest, NextResponse } from "next/server"

export type CatIndexResponse = {
  cats: CatList[]
}

export const GET = async (request: NextRequest) => {
  try {
    const cats = await prisma.cat.findMany({
      select: {
        id: true,
        name: true,
        sex: true,
        profile: true,
        ImageKey: true,

        breed: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json({ cats }, { status: 200 })

  } catch(error) {
    console.error("GET /api/cat ERROR:", error)
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}