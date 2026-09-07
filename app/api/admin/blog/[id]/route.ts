import { prisma } from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export type UpdateBlogRequestBody = {
  title: string
  content: string
  categoryId: number | null
  thumbnailImageUrl?: string
  thumbnailImageKey?: string
}

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }>},
) => {
  const { id } = await params

  const {
    title,
    content,
    categoryId,
    thumbnailImageUrl,
    thumbnailImageKey
  }: UpdateBlogRequestBody = await request.json()

  try {
    const catBlog = await prisma.catBlog.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
        categoryId,
        thumbnailImageUrl,
        thumbnailImageKey
      }
    })

    return NextResponse.json({ message: 'ブログを更新しました' }, { status: 200 })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}