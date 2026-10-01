// カートの商品数によって表示を切り替える
// 0 → カートに商品を追加してください
// 1 → ドロワー

import { CartItem } from "@/types/cat";

// カート内のアイテムの合計数を求める関数
export const sumItems = (cartItems: CartItem[] = []) => 
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
}

// 関数を使いまわす時はこのファイルから呼び出す
export const calculateItemTotal = (item: CartItem) =>
  item.quantity * item.goods.price;

export const calculateToalPrice = (cartItem: CartItem[]) => 
  cartItem.reduce((sum, item) => sum + calculateItemTotal(item), 0)  // 0はsumの初期値