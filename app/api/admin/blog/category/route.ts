import { prisma } from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

// typesに格納
export type BlogCategoryIndexResponse = {
  categories: {
    id: number
    name: string
  }[]
}

export const GET = async (request: NextRequest) => {
  try {
    // await prisma.catBlogCategoryはモデル名とリンクさせる
    const categories = await prisma.catBlogCategory.findMany({
      select: {
        id: true,
        name: true
      },
      orderBy: {
        id: 'desc'
      }
    })

    return NextResponse.json({ categories }, { status: 200 })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}