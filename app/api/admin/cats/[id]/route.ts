import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }>},
) => {
  const { id } = await params

  try {
    const cats = await prisma.cat.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    if(!cats) {
      return NextResponse.json(
        { message: '削除できませんでした'},
        { status: 400 }
      )
    }

    await prisma.cat.delete({
      where: {
        id: parseInt(id)
      }
    })

    return NextResponse.json({ message: '削除成功'}, { status: 200 })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}