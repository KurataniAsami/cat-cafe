import { prisma } from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export type UpdateBlogRequestBody = {
  title: string
  content: string
  categoryId: number | null
  thumbnailImageUrl?: string | null
  thumbnailImageKey?: string | null
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

// DELETE
export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }>},
) => {
  const { id } = await params

  // 対象のidの投稿を取得
  try {
    const catBlog = await prisma.catBlog.findUnique({
      where: {
        id: parseInt(id),
      }
    })

    if(!catBlog) {
      return NextResponse.json(
        { message: '記事が見つかりません'},
        { status: 404 }
      )
    }

    await prisma.catBlog.delete({
      where: {
        id: parseInt(id)
      }
    })

    return NextResponse.json({ message: '削除成功'}, { status: 200 })
  } catch(error) {
    // console.error("ブログ削除エラー:", error)
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}