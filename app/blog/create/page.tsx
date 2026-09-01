'use client'

import { CreateBlogRequestBody } from "@/app/api/admin/blog/route"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function BlogCreatePage() {

  const router = useRouter()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbnailImageKey, setThumbnailImageKey] = useState<string | null>(null)
  // const [ImageUrl, setImageUrl] = useState<string | null>(null)
  const [categoryId, setCategoryId] = useState<number | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const body: CreateBlogRequestBody = {
      title,
      content,
      categoryId,
      thumbnailImageKey
    }

    try {
      const res = await fetch(`/api/admin/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      router.push('/admin')
    } catch(error) {
      setError(error instanceof Error ? error.message: '記事を作成できませんでした')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">新規記事投稿</h1>
    </div>
  )
}

{/* <Select
  value={String(categoryId)}
  onValueChange={(value) => setCategoryId(Number(value))}
></Select> */}