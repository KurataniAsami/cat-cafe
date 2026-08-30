'use client'

import { useEffect, useState } from "react";
import { CatList } from "@/types/cat";
import DeleteModal from "../components/DeletModal";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"

export default function AdminHome() {

  const [cats, setCats] = useState<CatList[]>([])

  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {
    const getAllCats = async () => {
      const res = await fetch(`/api/cat`)
      const data = await res.json()
      setCats(data.cats)
    }

    getAllCats()
  },[])

  const handleDeleteClick = (id: number) => {
    setDeleteId(id)
    setIsDeleteOpen(true)
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/cats/${deleteId}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      const data = await res.json()

      setIsDeleteOpen(false)

      // stateから削除した猫(deleteIdと同じid)を取り除く
      setCats((prevCats) =>
        prevCats.filter((cat) => cat.id !== deleteId)
      )

      router.push('/admin')
    } catch(error) {
      setError(error instanceof Error ? error.message: 'ねこデータを削除できませんでした')
    }
  }

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

              <div className="flex gap-1">
                <div
                  // flexの時のボタン幅調整(flexない時はinline-block)
                  className="self-start text-black font-bold"  
                >
                  ({cat.breed.name}/
                </div>
                
                <span>{cat.sex})</span>
              </div>

              <Button
                onClick={() => handleDeleteClick(cat.id)}
                variant="outline"
                // flexの時のボタン幅調整(flexない時はinline-block)
                className="self-start bg-red-600 text-white"  
              >
                削除
              </Button>
            </li>
          )
        })}

        <DeleteModal
          isOpen={isDeleteOpen}
          onDelete={handleDelete}
          onClose={() => setIsDeleteOpen(false)}
        />
      </ul>
    </div>
  );
}
