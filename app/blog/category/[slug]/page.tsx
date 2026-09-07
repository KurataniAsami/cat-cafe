'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { BlogCategory, BlogList } from "@/types/cat"
import BlogCard from "@/app/components/BlogCard"
import CategorySidebar from "@/app/components/CategorySidebar"
import {
  Card,
  CardContent,
} from "@/components/ui/card"


export default function CategorySlugPage() {
  const { slug } = useParams<{ slug: string}>()

  const [blogs, setBlogs] = useState<BlogList[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])

  const [categoryName, setCategoryName] = useState("")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // 特定の種類のカテゴリー表示
  useEffect(() => {
    const fetchCategorys = async () => {
      try {
        const res = await fetch(`/api/blog/category/${slug}`)
        const data = await res.json()

        setBlogs(data.catBlogCategory.catBlog)
        setCategoryName(data.catBlogCategory.name)

      } catch(error) {
        setError(error instanceof Error ? error.message: 'カテゴリーが取得できませんでした')
      } finally {
        setLoading(false)
      }
    }

    if(slug) {
      fetchCategorys()
    }

  },[slug])

  // カテゴリータグ表示
  useEffect(() => {
    const getCategorieTag = async () => {
      const res = await fetch(`/api/blog/category`)
      const data = await res.json()

      setCategories(data.categories)
    }

    getCategorieTag()
  },[])

  return (
    <>
      {/* ヘッダー部分 */}
      <div className="relative">
        <Image
          src="/images/catcafe_header.jpg"
          alt="ヘッダー画像"
          width={1200}
          height={300}
          className="w-full h-[250px] object-cover opacity-60"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl text-black font-bold">
            {categoryName}
          </h1>
        </div>
      </div>

      <div className="flex items-cente gap-5 mt-10">
        <main className="grid grid-cols-2 gap-5 mx-5">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}
        </main>

        <aside>
          <Card>
            <CardContent>
              <CategorySidebar
                categories={categories}
              />
            </CardContent>
          </Card>
          </aside>
      </div>
      
    </>
  )
}