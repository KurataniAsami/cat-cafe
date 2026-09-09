// ブログ管理 一覧ページ
'use client'

import { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from 'uuid'
import { UpdateBlogRequestBody } from "@/app/api/admin/blog/[id]/route"
import { BlogCategory, BlogList } from "@/types/cat"
import BlogForm from "@/app/components/BlogForm"
import DeleteModal from "@/app/components/DeleteModal"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { supabase } from "@/libs/supabase"

export default function AdminBlogPage() {
  const router = useRouter()

  const [blogs, setBlogs] = useState<BlogList[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbnailImageKey, setThumbnailImageKey] = useState<string | null>(null)
  const [ImageUrl, setImageUrl] = useState<string | null>(null)

  // 編集対象の記事のidを保存する
  const [editBlogId, setEditBlogId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  // modal
  const [EditDialogOpen, setEditDialogOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

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

  // 画像更新
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
        setError(error.message)
        return
      }

      setThumbnailImageKey(data.path)

      const {
        data: { publicUrl },
      } = supabase.storage
      .from('catBlog_image')
      .getPublicUrl(data.path)

      setImageUrl(publicUrl)
  }

  // delete
  const handleDeleteClick = (id: number) => {
    setDeleteId(id)
    setIsDeleteOpen(true)
  }

  const handleDelete = async () => {
    if(deleteId === null) return

    try {
      const res = await fetch(`/api/admin/blog/${deleteId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message)
      }

      // stateから削除したブログ(deleteIdと同じid)を取り除く
      //  setBlogs((prevBlogs) =>
      //   prevBlogs.filter((item) => item.id !== deleteId)
      // )でも動く
      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog.id !== deleteId)
      )

      setIsDeleteOpen(false)
      setDeleteId(null)

    } catch(error) {
      setError(error instanceof Error ? error.message: '記事を削除できませんでした')
    }
  }

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
              <Link href={`/blog/${blog.id}`}>
                <div className="flex gap-5">
                  <div className="w-[120px]">
                    {blog.title}
                  </div>

                  <div>
                    {new Date(blog.createdAt).toLocaleDateString("ja-JP")}
                  </div>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setEditBlogId(blog.id)
                  setEditDialogOpen(true)
                }}
              >
                編集
              </button>

              <Button
                onClick={() => handleDeleteClick(blog.id)}
                variant="outline"
                className="self-start bg-red-600 text-white"  
              >
                削除
              </Button>
            </li>
          ))}
        </ul>

        {/* edit */}
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
              ImageUrl={ImageUrl}
              setImageUrl={setImageUrl}
              handleBlogImageUpload={handleBlogImageUpload}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              categories={categories}
              setCategories={setCategories}
            />
          </DialogContent>
        </Dialog>

        {/* delete */}
        <DeleteModal
          isOpen={isDeleteOpen}
          onDelete={handleDelete}
          onClose={() => setIsDeleteOpen(false)}
        />
      </div>
    </div>
  )
}