import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { CatGoods } from "@/types/cat"
import { useModal } from "../context/modalContent"
import MenuModal from "./menu-modal"

type GoodsCardProps = {
  goods: CatGoods
}

export default function GoodsCard({
  goods
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
          <span className="text-xl font-bold">{goods.name}</span>

          <div
            className="self-start p-1 bg-green-300 text-black font-bold"  
          >
            {goods.price}
          </div>

          <div className="flex justify-center mt-3">
            <div className="relative w-[140px] h-[140px]">
              {/* <Image
                src={publicUrl}
                alt="CatImage"
                fill
                className="rounded-full object-cover"
              /> */}
            </div>
          </div>
          <MenuModal/>
        </CardContent>
      </Card>
    </div>
  )
}