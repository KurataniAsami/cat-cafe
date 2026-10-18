import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CatOrder } from "@/types/cat";
import Image from "next/image";
import Link from "next/link";

type OrderCardProps = {
  order: CatOrder
}

export default function OrderCard({ order }:OrderCardProps) {

  const subtotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const fee = 100;   // 手数料
  const totalPrice = subtotal + fee;

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex items-center justify-between">
          <div className="flex flex-col gap-4">
            {/* 時間まで表示↓ */}
            {/* <CardDescription>{new Date(order.createdAt).toLocaleString()}</CardDescription> */}
             <CardDescription>{new Date(order.createdAt).toLocaleDateString()}</CardDescription> 
            <table className="w-full table-fixed">
              <thead>
                <tr>
                  <th className="w-1/2 text-left">商品名</th>
                  <th className="w-1/4 text-right">数量</th>
                  <th className="w-1/4 text-right">価格</th>
                </tr>
              </thead>

              {/* 注文に含まれる商品を繰り返すためmap */}
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 text-left">{item.goods.name}</td>
                    <td className="py-2 text-right">{item.quantity}</td>
                    <td className="py-2 text-right">{item.price.toLocaleString()}円</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        
        </CardHeader>
        {/* <CardContent className="space-y-4">
          <div className="flex items-center justify-between border-b pb-4 last:border-b-0">
            <div className="flex items-center gap-4">
              <div className="relative size-16 rounded-md overflow-hidden flex-none">
                <Image
                  src={"/no_image.png"}
                  alt={"メニュー画像"}
                  fill
                  className="object-cover w-full h-full"
                  sizes="64px"
                />
              </div>
              <div>
                <div className="font-medium">メニュー名</div>
                <div className="text-muted-foreground">¥#</div>
              </div>
            </div>
            <div className="text-right">
              <div>#個</div>
              <div>¥#</div>
            </div>
          </div>
        </CardContent> */}
        <CardFooter className="flex flex-col gap-1">
          <div className="w-full pt-4 space-y-1 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>小計</span>
              <span>¥{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>手数料</span>
              <span>{fee}</span>
            </div>
            <div className="flex justify-between">
              <span>サービス</span>
              <span>¥0</span>
            </div>
          </div>
          <div className="flex justify-between w-full font-bold pt-2">
            <span>合計</span>
            <span>¥{totalPrice}</span>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
