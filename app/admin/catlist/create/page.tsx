'use client'

import { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from 'uuid'
import { CreateCatRequestBody } from "@/app/api/admin/cats/route"
import { Breed } from "@/types/cat"
import CatListForm from "@/app/components/CatListForm"
import { supabase } from "@/libs/supabase"

export default function CreateCatPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [sex, setSex] = useState("")
  const [birthday, setBirthday] = useState("")

  const [breeds, setBreeds] = useState<Breed[]>([])
  const [breedId, setBreedId] = useState<number | null>(null)

  const [CatImageKey, setCatImageKey] = useState<string | null>(null)
  const [CatImageUrl, setCatImageUrl] = useState<string | null>(null)

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
      CatImageKey,
      CatImageUrl
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

  const handleCatImageUpload = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if(!event.target.files || event.target.files.length === 0 ) {
      return
    }

    const file = event.target.files[0]

    const filePath = `private/${uuidv4()}`

    // 画像を表示するためのURLを生成
    const { data, error } = await supabase.storage
      .from('cat_image')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

      if(error) {
        console.error("Storage Error:", error)
        setError(error.message)
        return
      }

      setCatImageKey(data.path)


      // 表示
      // 画像表示の時にDBから取得したキーをわたす
      const {
        data: { publicUrl },
      } = supabase.storage
      .from('cat_image')
      .getPublicUrl(data.path)

      setCatImageUrl(publicUrl)
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
        handleCatImageUpload={handleCatImageUpload}
      />
    </div>
  )
}