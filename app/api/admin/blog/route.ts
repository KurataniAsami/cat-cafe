import { prisma } from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

// POST
export type CreateBlogRequestBody = {
  title: string
  content: string
  categoryId: number | null  // 必須項目にしない場合
  thumbnailImageKey?: string | null
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
        categoryId,  // prismaの型はnullを使えないからAPIではundefinedとなる
        thumbnailImageKey
      }
    })

    return NextResponse.json({
      id: data.id
    })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 401 })
  }
}