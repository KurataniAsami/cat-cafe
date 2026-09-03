'use client'

import { CreateBlogRequestBody } from "@/app/api/admin/blog/route"
import { CatBlogIndexResponse } from "@/app/api/blog/route"
import BlogForm from "@/app/components/BlogForm"
import { BlogCategory } from "@/types/cat"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function BlogCreatePage() {

  const router = useRouter()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbnailImageKey, setThumbnailImageKey] = useState<string | null>(null)
  // const [ImageUrl, setImageUrl] = useState<string | null>(null)

  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [categories, setCategories] = useState<BlogCategory[]>([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreateSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if(categoryId === null) {
      setError("カテゴリーを選択してください")
      return
    }

    const body: CreateBlogRequestBody = {
      title,
      content,
      categoryId,
      thumbnailImageKey,
    }

    try {
      const res = await fetch(`/api/admin/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }

      router.push('/admin')
    } catch(error) {
      setError(error instanceof Error ? error.message: '記事を作成できませんでした')
    } finally {
      setLoading(false)
    }
  }

  // カテゴリーのセレクト部分の表示(DBに手動でデータ入れてから)
  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch(`/api/admin/blog/category`)
      const data = await res.json()

      setCategories(data.categories)
    }

    getCategories()
  },[])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">新規記事投稿</h1>
      <BlogForm
        onCreateSubmit={handleCreateSubmit}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailImageKey={thumbnailImageKey}
        setThumbnailImageKey={setThumbnailImageKey}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categories={categories}
        setCategories={setCategories}
      />
    </div>
  )
}

{/* <Select
  value={String(categoryId)}
  onValueChange={(value) => setCategoryId(Number(value))}
></Select> */}