
import { prisma } from "@/libs/prisma"
import { CatList } from "@/types/cat"
import { NextRequest, NextResponse } from "next/server"

export type CatIndexResponse = {
  cats: CatList[]
}

export const GET = async (request: NextRequest) => {

  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get("page") ?? 1)
  const limit = Number(searchParams.get("limit") ?? 8)

  const skip = (page -1) * limit

  try {
    const cats = await prisma.cat.findMany({
      skip,
      take: limit,   
      select: {
        id: true,
        name: true,
        sex: true,
        birthday: true,
        CatImageKey: true,

        breed: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    })

    const totalCats = await prisma.cat.count()

    const totalPages = Math.ceil(totalCats / limit)


    return NextResponse.json({
      cats,
      totalCats,
      page,
      totalPages
    }, { status: 200 })

  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}

