'use client'

import { useCart } from "@/hooks/cart/useCart"
import { computeCartDisplayLogic } from "@/lib/cart/utils"
import CartSheet from "./cart-sheet"

export default function Cart() {

  const { carts } = useCart()

  const cartItems = carts?.cartItems ?? [];

  return (
    <CartSheet
      cart={cartItems}
      count={cartItems.length}
    />
  )
}
