'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { CatGoods } from "@/types/cat"
import MenuModal from "../components/menu-modal"
import GoodsCard from "../components/GoodsCard"
import Cart from "../components/cart"
import { Button } from "@/components/ui/button";

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
    <div className="pt-3">
      <div className="flex justify-end">
        <Button size={"lg"}>
          <Link href={"/orders"}>注文履歴</Link>
        </Button>
        <Cart/>
      </div>

      <h1 className="text-xl text-center my-5">アイテムショップ</h1>

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