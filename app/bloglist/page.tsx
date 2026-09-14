'use client'

import { useEffect, useState } from "react";
import { BlogList } from "@/types/cat";
import BlogCard from "../components/BlogCard";
import { useRouter, useSearchParams } from "next/navigation";

export default function BlogListPage() {

  const router = useRouter()

  const [blogs, setBlogs] = useState<BlogList[]>([])

  const [loading, setLoading] = useState(true)

  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const searchParams = useSearchParams()

  useEffect(() => {
    const page = Number(searchParams.get("page") ?? 1)
    setCurrentPage(page)
  }, [searchParams])

  // ブログ記事の取得
  useEffect(() => {
    const getAllBlogs = async () => {
      const res = await fetch(`/api/bloglist?page=${currentPage}`)
      const data = await res.json()

      setBlogs(data.blogs)
      setTotalPages(data.totalPages)
      setLoading(false)
    }

    getAllBlogs()
    setLoading(false)
  }, [currentPage])

  const generatePagiNation = () => {
    const pages = [];

    for(let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }

    return pages;
  }

  const handlePageChange = (page: number) => {
    router.push(`/bloglist?page=${page}`)
  }

  return (
    <div>
      {/* blog */}
      <section id="blog">
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

      </section>
    </div>
  );
}