// ブログ管理 一覧 edit delete
'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UpdateBlogRequestBody } from "@/app/api/admin/blog/[id]/route"
import { BlogCategory, BlogList } from "@/types/cat"
import BlogForm from "@/app/components/BlogForm"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

export default function AdminBlogPage() {

  const router = useRouter()

  const [blogs, setBlogs] = useState<BlogList[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbnailImageKey, setThumbnailImageKey] = useState<string>("")
  // const [thumbnailImageUrl, setThumbnailImageUrl] = useState<string | null>(null)

  // 編集対象の記事のidを保存する
  const [editBlogId, setEditBlogId] = useState<number | null>(null)

  // modal
  const [EditDialogOpen, setEditDialogOpen] = useState(false)

  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [categories, setCategories] = useState<BlogCategory[]>([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  const getAllBlogs = async () => {
    const res = await fetch(`/api/blog`)
    const data = await res.json()

    setBlogs(data.blogs)
  }

  useEffect(() => {
    getAllBlogs()
  }, [])

  // カテゴリーのセレクト部分の表示(DBに手動でデータ入れてから)
  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch(`/api/blog/category`)
      const data = await res.json()

      setCategories(data.categories)
    }

    getCategories()
  },[])

  // edit
  const handleEditSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if(categoryId === null) {
      setError("カテゴリーを選択してください")
      return
    }

    const body: UpdateBlogRequestBody = {
      title,
      content,
      categoryId,
      thumbnailImageKey,
    }

    try {
      const res = await fetch(`/api/admin/blog/${editBlogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }

      // 更新後の処理
      await getAllBlogs()   // 最新のブログ一覧を取得

      setEditDialogOpen(false)
      setEditBlogId(null)

      router.push('/admin/blog')
    } catch(error) {
      setError(error instanceof Error ? error.message: '記事を作成できませんでした')
    } finally {
      setLoading(false)
    }
  } 

  // 更新する時フォームに既存データ表示
  useEffect(() => {
    if(!editBlogId) return

    const ChengeBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${editBlogId}`)
        const data = await res.json()

        setTitle(data.blog.title);
        setContent(data.blog.content);
        setThumbnailImageKey(data.blog.thumbnailImageKey ?? "");
        setCategoryId(data.blog.categoryId);
      } catch(error) {
        setError(error instanceof Error ? error.message: '既存データの取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    ChengeBlog()
  },[editBlogId])

  return (
    <div className="mt-5">
      <h1 className="text-center">過去の投稿</h1>

      <div className="flex">
        <ul className="mx-auto">
          {blogs.map((blog) => (
            <li
              key={blog.id}
              className="flex items-center justify-center gap-5 mt-5"
            >
              <div className="flex gap-5">
                <div className="w-[120px]">
                  {blog.title}
                </div>

                <div>
                  {new Date(blog.createdAt).toLocaleDateString("ja-JP")}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditBlogId(blog.id)
                  setEditDialogOpen(true)
                }}
              >
                編集
              </button>
            </li>
          ))}
        </ul>

          <Dialog
            open={EditDialogOpen}
            onOpenChange={setEditDialogOpen}
            >
            <DialogContent>
              <BlogForm
                onSubmit={handleEditSubmit}
                mode="edit"
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
            </DialogContent>
          </Dialog>
      </div>
    </div>
  )
}