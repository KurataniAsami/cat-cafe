'use client'

import { CreateCatRequestBody } from "@/app/api/admin/cats/route"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Breed } from "@/types/cat"
import CatListForm from "@/app/components/CatListForm"

export default function CreateCatPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [sex, setSex] = useState("")
  const [birthday, setBirthday] = useState("")

  const [breeds, setBreeds] = useState<Breed[]>([])
  const [breedId, setBreedId] = useState<number | null>(null)

  const [ImageKey, setImageKey] = useState<string | null>(null)
  const [ImageUrl, setImageUrl] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // セレクトの表示部分(品種)
  useEffect(() => {
    const getBreeds = async () => {
      const res = await fetch("/api/admin/breed")
      const data = await res.json()

      setBreeds(data.breeds)
    }

    getBreeds()
  }, [])

  // フォーム送信
  const handleSubmit = async (
     e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (breedId === null) {
      setError("品種を選択してください")
      return
    }

    const body: CreateCatRequestBody = {
      name,
      sex,
      birthday,
      breedId,
      ImageKey,
      ImageUrl
    } 

    try {
      const res = await fetch(`/api/admin/cats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      // POSTできなかった時にrouter.pushしない
      if (!res.ok) {
        throw new Error("猫を登録できませんでした")
      }

      router.push("/")
    } catch(error) {
      setError(error instanceof Error ? error.message: '猫を登録できませんでした')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center mt-5 py-3">
      <h1 className="text-2xl">猫の追加</h1>
      
      <CatListForm
        onSubmit={handleSubmit}
        name={name}
        setName={setName}
        sex={sex}
        setSex={setSex}
        birthday={birthday}
        setBirthday={setBirthday}
        breeds={breeds}
        breedId={breedId}
        setBreedId={setBreedId}
      />
    </div>
  )
}