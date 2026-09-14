import { prisma } from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export type CatBlogIndexResponse = {
  id: number
  title: string
  content: string
  thumbnailImageKey?: string | null
  createdAt: Date

  catBlogCategory: {
    id: number
    name: string
  }
}

export const GET = async (request: NextRequest) => {

  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get("page") ?? 1)
  const limit = Number(searchParams.get("limit") ?? 8)

  const skip = (page -1) * limit

  try {
    const blogs = await prisma.catBlog.findMany({
      skip,
      take: limit,
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

    const totalBlogs = await prisma.catBlog.count()

    const totalPages = Math.ceil(totalBlogs / limit)

    return NextResponse.json({
      blogs,
      totalBlogs,
      page,
      totalPages
    }, { status: 200 })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}



