import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { supabase } from "@/libs/supabase"
import { CatList } from "@/types/cat"
import Image from "next/image"

type CatCardProps = {
  cat: CatList  // １匹のデータだから[]はいらない
  CatImageKey: string | null
}

export const CatCard = ({
  cat,
  CatImageKey
}: CatCardProps) => {
  if(!CatImageKey) {
    return null
  }

  // 画像表示
  const {
    data: { publicUrl },
  } = supabase.storage
    .from('cat_image')
    .getPublicUrl(CatImageKey)
    
  return (
    <div>
      <Card>
        <CardContent className="flex flex-col">
          <span className="text-xl font-bold">{cat.name}</span>
            <div
              // flexの時のボタン幅調整(flexない時はinline-block)
              className="self-start bg-green-300 text-black font-bold"  
            >
              {cat.breed.name}
            </div>
          <span className="text-orange-400 mt-2">{cat.sex}</span>
          <span className="text-gray-600 mt-2">
            {new Date(cat.birthday).toLocaleDateString("ja-JP")}生まれ
          </span>

          <Image
            src={publicUrl}
            alt="CatImage"
            width={300}
            height={300}
            className="rounded-full"
          />
        </CardContent>
      </Card>
    </div>
  )
}
