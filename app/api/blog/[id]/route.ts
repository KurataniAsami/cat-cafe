import { prisma } from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export type BlogShowResponse = {
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

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise <{ id: string }>},
) => {
  const { id } = await params

  try {
    const blog = await prisma.catBlog.findUnique({
      where: {
        id: parseInt(id),
      },

      include: {
        catBlogCategory: true
      }
    })

    if(!blog) {
      return NextResponse.json(
        { message: '記事が見つかりません' },
        { status: 404 },
      )
    }

    return NextResponse.json({ blog }, { status: 200 })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}