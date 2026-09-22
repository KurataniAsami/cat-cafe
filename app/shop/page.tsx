'use client'

import { useEffect, useState } from "react"
import { CatGoods } from "@/types/cat"
import MenuModal from "../components/menu-modal"
import GoodsCard from "../components/GoodsCard"
import Cart from "../components/cart"

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
      <div className="flex justify-between">
        <h1>アイテムショップ</h1>
        <Cart/>
      </div>
      
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
          <MenuModal/>
        </main>
      </div>
    </div>
  )
}