import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }>}
) => {
  const { slug } = await params

  try {
    const breed = await prisma.breed.findUnique({
      where: {
        slug,
      },
      include: {
        cats: true,
      }
    })

    return NextResponse.json({ breed }, { status: 200 })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}