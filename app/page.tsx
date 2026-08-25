'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { CatList } from "@/types/cat";
import { Button } from "@/components/ui/button"

export default function Home() {

  const [cats, setCats] = useState<CatList[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAllCats = async () => {
      const res = await fetch(`/api/cat`)
      const data = await res.json()
      setCats(data.cats)
    }

    getAllCats()
  },[])

  return (
    <div>
      <h1 className="text-center mt-3">お迎えしている猫たち</h1>

      <ul className="flex justify-center gap-3 mt-5">
        {cats.map((cat) => {
          return (
            <li
              key={cat.id}
              className="flex flex-col"
            >
              <span className="text-xl font-bold">{cat.name}</span>

                  <Button
                    variant="outline"
                    // flexの時のボタン幅調整(flexない時はinline-block)
                    className="self-start bg-green-400 text-black font-bold"  
                    disabled
                  >
                    {cat.breed.name}
                  </Button>
              
              <span className="text-orange-400 mt-2">{cat.sex}</span>
              <span className="text-gray-600 mt-2">{cat.profile}</span>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
