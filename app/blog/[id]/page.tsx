'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { BlogShowResponse } from "@/app/api/blog/[id]/route"
import { BlogCategory } from "@/types/cat"
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import CategorySidebar from "@/app/components/CategorySidebar"

export default function BlogDetailPage() {

  const { id } = useParams<{ id: string }>()

  const [blog, setBlog] = useState<BlogShowResponse | null>(null)
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [slug, setSlug] = useState("")
  const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const getBlogDetail = async () => {
        const res = await fetch(`/api/blog/${id}`)
        const data = await res.json()
  
        setBlog(data.blog)
        setLoading(false)
      }
  
      getBlogDetail()
    },[])

    // 記事のカテゴリー表示(tag)
    useEffect(() => {
      const getCategorieTag = async () => {
        const res = await fetch(`/api/blog/category`)
        const data = await res.json()

        setCategories(data.categories)
      }

      getCategorieTag()
    },[])

    // サイドバーでのカテゴリー表示
    useEffect(() => {
      const getCategoryBySlug = async () => {
        const res = await fetch(`/api/blog/category`)
        const data = await res.json()

        setSlug(data.categories)
      }
      
      getCategoryBySlug()
    },[slug])

    if (loading) return <p>loading</p>
    if (!blog) return <p>記事が見つかりません</p>
  
    return (
      <div>
        <div className="flex justify-around mt-5">
          <main className="flex-flex-col">
            <Card className="w-[400px] text-left flex-col  rounded-2xl p-4 bg-white font-bold">
              <div className="text-right bg-green-400 self-end py-1 px-2 rounded-md">
                {blog.catBlogCategory ? (
                  <span>{blog.catBlogCategory.name}</span>
                ) : (
                  <span>カテゴリー未選択</span>
                )}
              </div>
              
              <CardTitle className="text-green-500 font-bold">
                {new Date(blog.createdAt).toLocaleDateString("ja-JP")}
              </CardTitle>
              <CardContent className="text-2xl text-gray-700 p-0">
                {blog.title}
              </CardContent>
              <div className="text-gray-500">
                {blog.content}
              </div>

              <Link href="/#blog" className="flex gap-3 text-orange-400">
                <span>← </span>
                <span>一覧へ戻る</span>
              </Link>
            </Card>
          </main>

          <aside>
            <Card>
              <CardContent>
                <CategorySidebar categories={categories} />
              </CardContent>
            </Card>
            
          </aside>
        </div>
      </div>
    )
}
