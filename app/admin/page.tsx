'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { CatList } from "@/types/cat";
import { Button } from "@/components/ui/button"
import DeleteModal from "../components/DeletModal";

export default function AdminHome() {

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
      <h1 className="text-center mt-3">登録済みの猫</h1>

      <ul className="flex flex-col justify-center gap-3 mt-5">
        {cats.map((cat) => {
          return (
            <li
              key={cat.id}
              className="flex items-center gap-2"
            >
              <span className="w-32 text-xl font-bold">{cat.name}</span>

                  <div
                    // flexの時のボタン幅調整(flexない時はinline-block)
                    className="self-start text-black font-bold"  
                  >
                    ({cat.breed.name}/
                  </div>
              
              <span>{cat.sex})</span>
            </li>
          )
        })}

        <DeleteModal/>
      </ul>
    </div>
  );
}
