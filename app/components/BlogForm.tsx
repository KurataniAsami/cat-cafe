'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BlogCategory } from "@/types/cat"
import { Dispatch, SetStateAction } from "react"

type createBlogProps = {
  onCreateSubmit: (e: { preventDefault: () => void; }) => Promise<void>
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  content: string
  setContent: Dispatch<SetStateAction<string>>
  thumbnailImageKey: string | null
  setThumbnailImageKey: Dispatch<SetStateAction<string | null>>
  categoryId: number | null
  setCategoryId: Dispatch<SetStateAction<number | null>>
  categories: BlogCategory[]
  setCategories: Dispatch<SetStateAction<BlogCategory[]>>
}

export default function BlogForm({
  onCreateSubmit,
  title,
  setTitle,
  content,
  setContent,
  thumbnailImageKey,
  setThumbnailImageKey,
  categoryId,
  setCategoryId,
  categories,
  setCategories
}:createBlogProps) {

  return (
  <div className="flex flex-col items-center mt-5 py-3">
      <h1 className="text-2xl">記事の作成</h1>
      <form
        onSubmit={onCreateSubmit}
        className="mt-3"
      >
        <div className="flex flex-col">
          <label>
            タイトル
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-200 rounded-md px-2 py-0.5 w-[180px]"
            placeholder="タイトルを入力してください"
          />
        </div>

        <div  className="flex flex-col mt-5">
          <label>
            本文
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="本文を入力してください"
            className="border border-gray-200 rounded-md px-2 py-0.5 w-[180px]"
          />
        </div>

        <div className="mt-2">
          <label>
            カテゴリー
          </label>
          <Select
            value={categoryId === null ? "" : String(categoryId)}  
            onValueChange={(value) => setCategoryId(Number(value))}
          >
            <SelectTrigger className="w-[180px] mt-1">
              <SelectValue>
                {categoryId !== null
                  ? categories.find((category) => category.id === categoryId)?.name
                  : "カテゴリーを選択"}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={String(category.id)}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        

        <div className="flex justify-between items-center mt-2 pt-4">
          {/* <label htmlFor="ImageKey">
            <ImageIcon/>
          </label>
          <input
            type="file"
            id="ImageKey"
            onChange={handleImageUpload}
            className="sr-only"
          /> */}

          <button
            type="submit"
            className="bg-orange-400 text-white rounded-3xl font-bold px-4 py-2 mt-3"
          >
            作成する
          </button>
          </div>
      </form>
    </div>
  )
}