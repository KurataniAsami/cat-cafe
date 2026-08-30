'use client'

import { CreateCatRequestBody } from "@/app/api/admin/cats/route"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Breed } from "@/types/cat"

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

  // 性別のセレクトメニュー
    const items = [
      { label: "おとこのこ", value: "おとこのこ" },
      { label: "おんなのこ", value: "おんなのこ" },
    ]

  return (
    <div className="flex flex-col items-center mt-5 py-3">
      <h1 className="text-2xl">猫の追加</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-3"
      >
        <div className="flex flex-col">
          <label>
            名前
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="focus:outline-none"
            placeholder="タマ"
          />
        </div>

        <div className="mt-2">
          <label>
            性別
          </label>
          <Select
            value={sex}
            onValueChange={(value) => setSex(value ?? "")}
          >
            <SelectTrigger className="w-[180px] mt-1">
              <SelectValue placeholder="性別を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-2">
          <label>
            種類
          </label>
          <Select
            value={breedId === null ? "" : String(breedId)}  // placeholderを表示させる
            onValueChange={(value) => setBreedId(Number(value))}
          >
            <SelectTrigger className="w-[180px] mt-1">
              <SelectValue>
                {breedId === null
                  ? "品種を選択"
                  : breeds.find((b) => b.id === breedId)?.name}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {breeds.map((breed) => (
                  <SelectItem
                    key={breed.id}
                    value={String(breed.id)}
                  >
                    {breed.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-2">
          <label>
            誕生日
          </label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="focus:outline-none"
          />
        </div>

        <div className="flex justify-between items-center border-t border-t-gray-500 mt-2 pt-4">
          {/* <label htmlFor="ImageKey">
            <ImageIcon/>
          </label>
          <input
            type="file"
            id="ImageKey"
            onChange={handleImageUpload}
            className="sr-only"
          /> */}

          <button
            type="submit"
            className="bg-orange-400 text-white rounded-3xl font-bold px-4 py-2 mt-3"
          >
            追加する
          </button>
        </div>
      </form>
    </div>
  )
}