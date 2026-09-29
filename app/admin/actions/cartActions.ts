"use server"

import { prisma } from "@/libs/prisma"
import { CatGoods } from "@/types/cat"

export async function addToCartAction(
  selectedMenu: CatGoods,
  quantity: number
) {
  const cartId = 1

  const existingItem = await prisma.catCartItem.findFirst({
    where: {
      cartId,
      goodsId: selectedMenu.id,
    },
  })

  if (existingItem) {
    await prisma.catCartItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity,
      },
    })
  } else {
    await prisma.catCartItem.create({
      data: {
        cartId,
        goodsId: selectedMenu.id,
        quantity,
      },
    })
  }
}

export async function updateCartItemAction(
  quantity: number,
  cartItemId: number
) {
  if (quantity === 0) {
    // 削除処理
    await prisma.catCartItem.delete({
      where: {
        id: cartItemId,
      },
    })

    return
  }

  // 数量更新
  await prisma.catCartItem.update({
    where: {
      id: cartItemId,
    },
    data: {
      quantity,
    },
  })
}

