'use client'

import { useCart } from "@/hooks/cart/useCart"
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
