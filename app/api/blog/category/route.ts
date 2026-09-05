import { prisma } from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export type CatBlogIndexResponse = {
  id: number
  title: string
  content: string
  thumbnailImageKey: string
  createdAt: Date

  catBlogCategory: {
    id: number
    name: string
  }
}

export const GET = async (request: NextRequest) => {
  try {
    const categories = await prisma.catBlogCategory.findMany({
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