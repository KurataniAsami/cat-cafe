// カートの商品数によって表示を切り替える
// 0 → カートに商品を追加してください
// 1 → ドロワー
// 2～ → ドロップダウン

import { CartItem } from "@/types/cat";

// カート内のアイテムの合計数を求める関数
const sumItems = (cartItems: CartItem[]) => 
  cartItems.reduce((sum, item) => sum + item.quantity ,0)

export function computeCartDisplayLogic(carts: CartItem[] | undefined
) {
  const items = carts ?? []
  
  // カートなし
  if(!carts || carts.length === 0) {
    return {displayMode: "cartSheet", sheetCart: null, cartCount: 0}
  }

  // カート1件
  if(carts.length === 1) {
    const only = carts[0];
    return {
      displayMode: "cartSheet",
      sheetCart: only,
      cartCount: sumItems(carts)
    };
  }

  // カート2件～
  return {displayMode: "cartDropDown", sheetCart: null, cartCount: 0}
}