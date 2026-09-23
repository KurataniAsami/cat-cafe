import { CartItem } from "@/types/cat"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button"

type CartSeetProps = {
  cart: CartItem | null
  count: number
}
export default function CartSheet({
  cart, count
}: CartSeetProps) {
  return (
    <Sheet>
      <SheetTrigger className="relative cursor-pointer">
        <ShoppingCart />
        <span className="absolute top-0 right-0 -translate-y-1/2 bg-green-700 rounded-full size-4 text-xs text-primary-foreground flex items-center justify-center">
          {"#"}
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
        {cart ? <div>アイテム</div> : (

          <div className="flex flex-col items-center gap-4 justify-center h-full">
            <h2 className="text-xl font-bold">カート内に商品はございません</h2>
            <SheetClose>
              <Button
                className="rounded-full p-4"
              >
                買い物を続ける
              </Button>
            </SheetClose>
          </div>
          )}
      </SheetContent>
    </Sheet>
  )
}
