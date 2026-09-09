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
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import { BlogThumbnail } from "./BlogThumbnail";
import ClearIcon from '@mui/icons-material/Clear';
import { supabase } from "@/libs/supabase";

type createBlogProps = {
  // createとeditを mode + onSubmitで統一
  onSubmit: (e: { preventDefault: () => void; }) => Promise<void>
  mode: "create" | "edit"
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
  ImageUrl: string | null
  setImageUrl: Dispatch<SetStateAction<string | null>>
  handleBlogImageUpload: (post: ChangeEvent<HTMLInputElement, Element>) => Promise<void>
  handleRemoveImage: () => Promise<void>
}

export default function BlogForm({
  onSubmit,
  title,
  setTitle,
  content,
  setContent,
  thumbnailImageKey,
  setThumbnailImageKey,
  categoryId,
  setCategoryId,
  categories,
  setCategories,
  mode,
  ImageUrl,
  setImageUrl,
  handleBlogImageUpload,
  handleRemoveImage
}:createBlogProps) {

  return (
  <div className="flex flex-col items-center mt-5 py-3">
      <h1 className="text-2xl">記事の作成</h1>
      <form
        onSubmit={onSubmit}
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
            className="border border-gray-200 rounded-md px-2 py-0.5 w-[300px]"
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
            className="border border-gray-200 rounded-md px-2 py-0.5 w-[300px]"
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
            <SelectTrigger className="w-[300px] mt-1">
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

          <div className="mt-3 flex gap-2 justify-between">
            <div>
              <label htmlFor="ImageKey"
                className="flex gap-2 items-center cursor-pointer"
              >
                画像
                <div className="mb-0.5">
                  <LocalSeeIcon/>
                </div>
              </label>
              
              <input
                type="file"
                id="ImageKey"
                onChange={handleBlogImageUpload}
                className="sr-only"
              />
            </div>

            <button
              type="button"
              onClick={handleRemoveImage}
            >
              <ClearIcon/>
            </button>
          </div>

          {/* 画像プレビュー */}
          <BlogThumbnail
            thumbnailImageKey={thumbnailImageKey}
          />
        </div>

        <div className="flex justify-center items-center mt-2 pt-4">
          <button
            onClick={onSubmit}
            className="bg-orange-400 text-white rounded-3xl font-bold px-4 py-2 mt-3"
          >
            {mode === "edit" ? "更新する" : "作成する"}
          </button>
          </div>
      </form>
    </div>
  )
}