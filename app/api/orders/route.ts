// 220, 223
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const orders = await prisma.catOrder.findMany({
    include: {
      items: {
        include: {
          goods: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(orders);
}