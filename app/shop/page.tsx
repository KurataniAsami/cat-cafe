'use client'

import { CatGoods } from "@/types/cat"
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import Image from "next/image"
import MenuModal from "../components/menu-modal"

export default function ShopPage() {
  const [goods, setGoods] = useState<CatGoods[]>([])

  // const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getAllItems = async () => {
      const res = await fetch(`/api/CatGoods`)
      const data = await res.json()
      setGoods(data.goods)
    }

    getAllItems()
  },[])

  return (
    <div>
      <h1>アイテムショップ</h1>
      <div className="flex">
        <main className="basis-[70%]">
          <ul>
            {goods.map((goods) => {
              return (
                <li key={goods.id}>
                  <Card className="w-[300px]">
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
                    </CardContent>
                  </Card>
                </li>
              )
            })}
          </ul>
        </main>

        <aside className="basis-[30%] min-h-screen bg-white">
          <MenuModal />
        </aside>
      </div>
    </div>
  )
}