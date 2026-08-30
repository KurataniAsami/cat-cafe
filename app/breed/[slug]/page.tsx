'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Breed, CatList } from "@/types/cat";
import {
  Card,
  CardContent,
} from "@/components/ui/card"


export default function BreedPage() {
  const { slug } = useParams<{ slug: string }>()

  const [cats, setCats] = useState<CatList[]>([])
  const [breeds, setBreeds] = useState<Breed[]>([])

  // APIから猫種名を取得
  const [breedName, setBreedName] = useState("")
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 特定の種類の猫を表示
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await fetch(`/api/admin/breed/${slug}`)
        const data = await res.json()

        setBreedName(data.breed.name)
        setCats(data.breed.cats)
      } catch(error) {
        setError(error instanceof Error ? error.message: '猫の種類のデータが取得できません')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchCats()
    }

  },[slug])

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const res = await fetch(`/api/admin/breed`)
        const data = await res.json()
        setBreeds(data.breeds)
      } catch(error) {
        setError(error instanceof Error ? error.message: '猫の種類のデータが取得できません')
      } finally {
        setLoading(false)
      }
    }

    fetchBreeds()
  },[])

  return (
    <div>
      <h1 className="text-center mt-3">{breedName}の猫一覧</h1>

      <div className="flex justify-center gap-3 mt-5">
        {breeds.map((breed) => (
          <Link href={`/breed/${breed.slug}`}
            key={breed.id}
          >
            <Card className="rounded-2xl px-3 py-2 bg-green-300 font-bold">
              <CardContent>
                {breed.name}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div>
        <ul className="flex justify-center gap-3 mt-5">
          {cats.map((cat) => {
            return (
              <li
                key={cat.id}
              >
                <Card>
                  <CardContent className="flex flex-col">
                    <span className="text-xl font-bold">{cat.name}</span>
                    <span className="text-orange-400 mt-2">{cat.sex}</span>
                    <span className="text-gray-600 mt-2">
                      {new Date(cat.birthday).toLocaleDateString("ja-JP")}生まれ
                    </span>
                  </CardContent>
                </Card>
              </li>
            )
          })}
        </ul>
      </div>

    </div>
  );
}
