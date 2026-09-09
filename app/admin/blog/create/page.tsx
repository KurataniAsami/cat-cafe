'use client'

import { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from 'uuid'
import { CreateBlogRequestBody } from "@/app/api/admin/blog/route"
import { BlogCategory, BlogList } from "@/types/cat"
import BlogForm from "@/app/components/BlogForm"
import { supabase } from "@/libs/supabase"

export default function BlogCreatePage() {

  const router = useRouter()

  const [blogs, setBlogs] = useState<BlogList[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbnailImageKey, setThumbnailImageKey] = useState<string | null>(null)
  const [ImageUrl, setImageUrl] = useState<string | null>(null)

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

      router.push('/admin/blog')
    } catch(error) {
      setError(error instanceof Error ? error.message: '記事を作成できませんでした')
    } finally {
      setLoading(false)
    }
  }

  // カテゴリーのセレクト部分の表示(DBに手動でデータ入れてから)
  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch(`/api/blog/category`)
      const data = await res.json()

      setCategories(data.categories)
    }

    getCategories()
  },[])

  // アップロードした画像を表示
  // キーだけDBに保存され表示する時にURLをsupabaseが作成する
  // << -- 作成時
  const handleBlogImageUpload = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if(!event.target.files || event.target.files.length === 0 ) {
      return
    }

    const file = event.target.files[0]

    const filePath = `private/${uuidv4()}`

    // 画像を表示するためのURLを生成
    const { data, error } = await supabase.storage
      .from('catBlog_image')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

      if(error) {
        console.error("Storage Error:", error)
        setError(error.message)
        return
      }

      setThumbnailImageKey(data.path)

      //  -- >>

      // 表示
      // 画像表示の時にDBから取得したキーをわたす
      const {
        data: { publicUrl },
      } = supabase.storage
      .from('catBlog_image')
      .getPublicUrl(data.path)

      setImageUrl(publicUrl)
  }

  // 画像キャンセル
  const handleRemoveImage = async () => {
    if(!thumbnailImageKey) return

    const { error } = await supabase.storage
      .from('catBlog_image')
      .remove([thumbnailImageKey])

    if(error) {
      setError(error.message)
      return
    }

    setThumbnailImageKey(null)
    setImageUrl(null)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-10 text-center">新規記事投稿</h1>
      <BlogForm
        onSubmit={handleCreateSubmit}
        mode="create"
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailImageKey={thumbnailImageKey}
        setThumbnailImageKey={setThumbnailImageKey}
        ImageUrl={ImageUrl}
        setImageUrl={setImageUrl}
        handleBlogImageUpload={handleBlogImageUpload}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categories={categories}
        setCategories={setCategories}
        handleRemoveImage={handleRemoveImage}
      />
    </div>
  )
}

// npm install uuid