'use client'

import { useEffect, useState } from "react"
import { CatGoods } from "@/types/cat"
import MenuModal from "../components/menu-modal"
import GoodsCard from "../components/GoodsCard"

export default function ShopPage() {
  const [goods, setGoods] = useState<CatGoods[]>([])

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
                  <GoodsCard
                    goods={goods}
                  />
                </li>
              )
            })}
          </ul>
        </main>

        <aside className="basis-[30%] min-h-screen bg-white">
          <MenuModal/>
        </aside>
      </div>
    </div>
  )
}