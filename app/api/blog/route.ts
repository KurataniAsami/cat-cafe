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
    const blogs = await prisma.catBlog.findMany({
      include: {
        catBlogCategory: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ blogs }, { status: 200 })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}

