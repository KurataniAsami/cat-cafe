import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (
  request: NextRequest,
  { params }: {params: Promise<{ slug: string }>}
) => {
  const { slug } = await params

  try {
    const catBlogCategory = await prisma.catBlogCategory.findUnique({
      where: {
        slug
      },
      include: {
        catBlog: true   // リレーション名から
      }
    })

    return NextResponse.json({ catBlogCategory }, { status: 200 })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}