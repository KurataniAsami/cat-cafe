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

// POST
export type CreateBlogRequestBody = {
  title: string
  content: string
  categoryId: number | null  // 必須項目にしない場合
  thumbnailImageKey?: string | null
  ImageUrl?: string | null
}

// レスポンス（返す型）
export type CreateBlogResponse = {
  id: number
}

export const POST = async (request: NextRequest) => {
  try {
    const body: CreateBlogRequestBody = await request.json()

    const { title, content, categoryId, thumbnailImageKey } = body

    const data = await prisma.catBlog.create({
      data: {
        title,
        content,
        categoryId,
        thumbnailImageKey
      }
    })

    return NextResponse.json({
      id: data.id
    })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 })
  }
}