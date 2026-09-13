'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { Breed, CatList } from "@/types/cat";
import { CatCard } from "@/app/components/CatCard";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const [cats, setCats] = useState<CatList[]>([])
  const [breeds, setBreeds] = useState<Breed[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ページネーション
  const [totalPages, setTotalPages] = useState(1)

  const [currentPage, setCurrentPage] = useState(1)

  // URLのクエリパラメータを取得, currentPageにセット
  const searchParams = useSearchParams()

  useEffect(() => {
    const page = Number(searchParams.get("page") ?? 1)
    setCurrentPage(page)
  }, [searchParams])

  // ねこ一覧取得
  useEffect(() => {
    const getAllCats = async () => {
      const res = await fetch(`/api/catlist?page=${currentPage}`)
      const data = await res.json()
      setCats(data.cats)
      setTotalPages(data.totalPages)
      setLoading(false)
    }

    getAllCats()
  },[currentPage])

  // ページ番号の作成(配列)
  const generatePagiNation = () => {
    const pages = [];

    for(let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }

    return pages;
  }

  // 指定したページ番号のURLへ移動する
  const handlePageChange = (page: number) => {
    router.push(`/catlist?page=${page}`)
  }

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

  if(loading) return <p>loading...</p>
  if(cats.length === 0) return <p>データがありません</p>

  return (
    <div className="px-3">
      <h1 className="text-center mt-3">お迎えしている猫たち</h1>

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

      <ul className="grid grid-cols-4 mt-10">
        {cats.map((cat) => {
          return (
            <li
              key={cat.id}
              className="mb-5 mx-3"
            >
              <CatCard
                cat={cat}
                CatImageKey={cat.CatImageKey}  
              />
            </li>
          )
        })}
      </ul>

      {totalPages > 1 && (
        <div className="relative w-full max-w-5xl mt-6 mx-auto">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="text-black text-sm w-12 h-12  hover:bg-gray-400 absolute left-0 bg-gray-300 px-4 py-2 rounded"
            >
              前
            </button>
          )}

          <div className="flex justify-center items-center gap-2">
            {generatePagiNation().map((page, index) => (
              <button
                key={page}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                className={`w-10 h-10 sm:w-12 sm:h-12 mx-1 rounded text-sm sm:text-base
                  ${currentPage === page ? 'bg-orange-400 text-black' : 'bg-gray-300 text-black hover:bg-gray-400'}
                `}
              >
                {page}
              </button>
            ))}
          </div>

          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className=" text-black text-sm w-12 h-12  hover:bg-gray-400 absolute right-0 bg-gray-300 px-4 py-2 rounded"
            >
              次
            </button>
          )}
        </div>
      )}

    </div>
  );
}