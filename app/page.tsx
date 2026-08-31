'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BlogPage from "./components/BlogList";
import { Breed, CatList } from "@/types/cat";
import {
  Card,
  CardContent,
} from "@/components/ui/card"



export default function Home() {
  const [cats, setCats] = useState<CatList[]>([])
  const [breeds, setBreeds] = useState<Breed[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getAllCats = async () => {
      const res = await fetch(`/api/cat`)
      const data = await res.json()
      setCats(data.cats)
    }

    getAllCats()
  },[])

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const res = await fetch(`/api/admin/breed`)
        const data = await res.json()
        console.log("breed API:", data)
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
      <h1 className="text-center mt-3">お迎えしている猫たち</h1>

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

      <ul className="flex justify-center gap-3 mt-5">
        {cats.map((cat) => {
          return (
            <li
              key={cat.id}
            >
              <Card>
                <CardContent className="flex flex-col">
                  <span className="text-xl font-bold">{cat.name}</span>
                    <div
                      // flexの時のボタン幅調整(flexない時はinline-block)
                      className="self-start bg-green-300 text-black font-bold"  
                    >
                      {cat.breed.name}
                    </div>
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

      {/* blog */}
      <section id="blog">
        <h1 className="text-center mt-10 text-2xl">スタッフブログ</h1>
        <p className="text-center mt-3">猫たちの日常やカフェの最新情報をお届けします</p>
        {/* <CatBlogList limit={3} /> */}
        <BlogPage/>
      </section>
    </div>
  );
}