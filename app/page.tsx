'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { BlogList, Breed, CatList } from "@/types/cat";
import BlogCard from "./components/BlogCard";
import { CatCard } from "./components/CatCard";
import {
  Card,
  CardContent,
} from "@/components/ui/card"

export default function Home() {
  const [cats, setCats] = useState<CatList[]>([])
  const [blogs, setBlogs] = useState<BlogList[]>([])
  const [breeds, setBreeds] = useState<Breed[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ねこ一覧取得
  useEffect(() => {
    const getAllCats = async () => {
      const res = await fetch(`/api/cat`)
      const data = await res.json()
      setCats(data.cats)
    }

    getAllCats()
  },[])

  // 描種の取得
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

  // ブログ記事の取得
  useEffect(() => {
    const getAllBlogs = async () => {
      const res = await fetch(`/api/blog`)
      const data = await res.json()

      setBlogs(data.blogs)
    }

    getAllBlogs()
  }, [])

  return (
    <div>
      <h1 className="text-center text-2xl mt-5">お迎えしている猫たち</h1>

      {/* 描種一覧 */}
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

      {/* 猫リスト */}
      <ul className="flex justify-center gap-3 mt-7">
        {cats.map((cat) => {
          return (
            <li
              key={cat.id}
            >
              <CatCard
                cat={cat}
                CatImageKey={cat.CatImageKey}
                width={240}  
              />
            </li>
          )
        })}
      </ul>

      <div className="flex justify-center mt-5">
        <Link
          href="/catlist"
          className="rounded-full bg-orange-400 text-white px-4 py-2 text-md font-bold"  
        >
          すべて見る
        </Link>
      </div>

      {/* blog */}
      <section id="blog" className="mb-5">
        <h1 className="text-center mt-10 text-2xl">スタッフブログ</h1>
        <p className="text-center mt-3">猫たちの日常やカフェの最新情報をお届けします</p>
        <ul className="grid grid-cols-2 max-w-[850px] mx-auto">
          {blogs.map((blog) => (
            <li key={blog.id}
              className="flex justify-center mt-5"
            >
              <BlogCard blog={blog}/>
            </li>
          ))}
        </ul>

        <div className="flex justify-center mt-5">
          <Link
            href="/bloglist"
            className="rounded-full bg-orange-400 text-white px-4 py-2 text-md font-bold"  
          >
            すべて見る
          </Link>
        </div>
      </section>
    </div>
  );
}