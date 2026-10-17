import { useCart } from "@/hooks/cart/useCart";
import Link from "next/link";
import { CartItem } from "@/types/cat"
import { calculateItemTotal, calculateToalPrice } from "@/lib/cart/utils";
import { updateCartItemAction } from "../admin/actions/cartActions";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ShoppingCart } from "lucide-react";
import DeleteIcon from '@mui/icons-material/Delete';

type CartSeetProps = {
  cart: CartItem[];
  count: number
}

export default function CartSheet({
  cart, count
}: CartSeetProps) {

  const { carts, mutateCart } = useCart()
  // cartItemsを配列にしてmapできるようにする
  const cartItems = carts?.cartItems ?? [];  // カートがなければ配列にする

  const handleUpdateCartItem = async (value: string, cartItemId: number) => {
    if(!cart) return;

    // valueをnumberに変換する
    const quantity = Number(value);

    try {
      await updateCartItemAction(quantity, cartItemId);

      await mutateCart();
    } catch(error) {
      console.error(error);
      alert("エラーが発生しました")
    }
  }

  return (
    <Sheet>
      <SheetTrigger className="relative cursor-pointer m-2">
        <ShoppingCart />
        <span className="absolute top-0 right-0 -translate-y-1/2 bg-green-700 rounded-full size-4 text-xs text-primary-foreground flex items-center justify-center">
          {count}
        </span>
      </SheetTrigger>

      <SheetContent className="p-6">
        {/* sr-onlyで初期非表示 */}
        <SheetHeader className="sr-only">
          <SheetTitle>カート</SheetTitle>
          <SheetDescription>
            カート内の商品を確認・編集できます。購入手続きに進むには「お会計に進む」へ。
          </SheetDescription>
        </SheetHeader>

        {/* cartが存在する場合 */}
        {cart ? ( 
          <>
            <div className="flex justify-end mt-5 text-red-600">
              {/* shadcnのtooltip */}
              <Tooltip>
                <TooltipTrigger>
                  <DeleteIcon/>
                </TooltipTrigger>
                <TooltipContent>
                  <p>ゴミ箱を空にする</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/*  メニューエリア */}
            <ul className="flex-1 overflow-y-auto">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="border-b py-5"
                >
                  <div className="flex items-center justify-between">
                    <p>{item.goods.name}</p>
                    <div className="relative w-[72px] h-[72px]">
                      {/* <Image
                        src={item.goods.imageKey}
                        alt="メニュー画像"
                        fill
                        sizes="72px"
                        className="object-cover rounded"
                      /> */}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label htmlFor="quantity" className="sr-only">
                      数量
                    </label>
                    <select
                      id="quantity"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handleUpdateCartItem(e.target.value, item.id)}
                      className="border rounded-full pr-8 pl-4 bg-muted h-9"
                    >
                      <option value="0">削除する</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <p>￥{calculateItemTotal(item).toLocaleString()}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-between font-bold text-lg">
              <div>小計</div>
              <div>{calculateToalPrice(cart).toLocaleString()}</div>
            </div>

            <SheetClose
              render={
                <Button>
                  <Link href={`/checkout/`}>お会計に進む</Link>
                </Button>
              }
            >
            </SheetClose>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 justify-center h-full">
            <h2 className="text-xl font-bold">カート内に商品はございません</h2>
            <SheetClose
              render={
                <Button
                  className="rounded-full p-4"
                />
              }
            >
              買い物を続ける
            </SheetClose>
          </div>
          )}
      </SheetContent>
    </Sheet>
  )
}
