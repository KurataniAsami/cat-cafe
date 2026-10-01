'use client'

import { useCart } from "@/hooks/cart/useCart";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import CartSkeleton from "./cart-skelton";
import { calculateItemTotal, calculateToalPrice, sumItems } from "@/lib/cart/utils";
import { updateCartItemAction } from "../admin/actions/cartActions";

export default function CartSummary() {
  const { carts, isLoading, cartsError, mutateCart } = useCart();

  const cartItems = carts?.cartItems ?? [];

  if(cartsError) {
    console.error(cartsError);
    return <div>{cartsError.message}</div>
  }

  if(isLoading) {
    return <CartSkeleton />
  }

  if(carts === null) {
    return <div>カートが見つかりません</div>
  }

  // 手数料など
  const fee = 100;
  const service = 0;
  const delivary = 0;
  const subtotal = calculateToalPrice(cartItems);
  const total = fee + service + delivary + subtotal;

  const handleUpdateCartItem = async (value: string, cartItemId: number) => {
    if(!carts) return;

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
    <Card className="max-w-md min-w-[420px]">
      <CardContent>
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>カートの中身{sumItems(cartItems)}個の商品</AccordionTrigger>

            {carts && carts.cartItems.map((cartItem) => (
              <AccordionContent key={cartItem.id} className="flex items-center">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative size-14 rounded-full overflow-hidden flex-none">
                    <Image
                      src={cartItem.goods.imageKey ?? "/no_image.png"}
                      alt={cartItem.goods.name}
                      fill
                      sizes="56px"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="font-bold">{cartItem.goods.name}</div>
                    <p className="text-muted-foreground text-sm">￥{calculateItemTotal(cartItem)}</p>
                  </div>
                </div>

                <label htmlFor={`cart-quantity-${cartItem.id}`} className="sr-only">
                  数量
                </label>
                <select
                  id={`cart-quantity-${cartItem.id}`}  // -${cartItem.id}はid名（quantity）の重複を避けるため
                  name="quantity"
                  className="border rounded-full pr-8 pl-4 bg-muted h-9"
                  value={cartItem.quantity}
                  onChange={(e) => handleUpdateCartItem(e.target.value, cartItem.id)}
                >
                  <option value="0">削除する</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </AccordionContent>
            ))}
          </AccordionItem>
        </Accordion>
      </CardContent>

      <CardFooter>
        <div className="w-full">
          <h6 className="font-bold text-xl mb-4">注文の合計額</h6>
          <ul className="grid gap-4">
            <li className="flex justify-between text-muted-foreground">
              <p>小計</p>
              <p>¥{subtotal}</p>
            </li>
            <li className="flex justify-between text-muted-foreground">
              <p>手数料</p>
              <p>¥ {fee}</p>
            </li>
            <li className="flex justify-between text-muted-foreground">
              <p>サービス</p>
              <p>¥ {service}</p>
            </li>
            <li className="flex justify-between text-muted-foreground">
              <p>配達</p>
              <p>¥ {delivary}</p>
            </li>
          </ul>
          <hr className="my-2" />
          <div className="flex justify-between font-medium">
            <p>合計</p>
            <p>¥{total}</p>
          </div>
        </div>
      </CardFooter>

      <div className="flex justify-center mt-3">
        <Button className="cursor-pointer mb-7 w-[300px]">
          注文を確定する
        </Button>
      </div>
    </Card>
  );
}