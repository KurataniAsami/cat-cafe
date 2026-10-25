import Image from "next/image"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { CatGoods } from "@/types/cat"
import { useModal } from "../context/modalContent"
import { Button } from "@/components/ui/button"

// テーブルから画像のパスを入力した場合keyはいらない
type GoodsCardProps = {
  goods: CatGoods
}

export default function GoodsCard({
  goods,
}:GoodsCardProps) {

  const {
    openModal,
  } = useModal();   // Context呼び出し

  return (
    <div>
      <Card
        className="w-[300px]"
        onClick={() => openModal(goods)}  
      >
        <CardContent className="flex flex-col">
          <div className="flex justify-center mt-3">
            <div className="relative w-[140px] h-[140px]">
              {goods.imageUrl && (
                <Image
                  src={goods.imageUrl}
                  alt={goods.name}
                  fill
                  className="rounded-full object-cover"
                />
              )}
            </div>
          </div>

          <span className="text-xl font-bold mt-5">{goods.name}</span>

          <div
            className="font-bold text-center mt-2"  
          >
            ￥{goods.price.toLocaleString()}
          </div>

          <Button className="bg-orange-400 font-bold mt-2">
            カートに入れる
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}