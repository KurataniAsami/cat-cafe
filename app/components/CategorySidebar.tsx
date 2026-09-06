'use client'

import { BlogCategory } from "@/types/cat"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"

type CategorySlugProps = {
  categories: BlogCategory[]
}

export default function CategorySidebar({
  categories,
}: CategorySlugProps) {

  const [catBlogCategory, setCatBlogCategory] = useState<BlogCategory[]>([])
  
  const { slug } = useParams<{ slug: string }>()
  
  return (
    <div className="w-[200px]">
      <h1 className="text-lg border-b pb-1">カテゴリー</h1>
      {categories?.map((category) => (
        <div key={category.id} className="my-2">
          <Link
            href={`/blog/category/${category.slug}`}
          >
            {category.name} ({category._count.catBlog})
          </Link>

        </div>
      ))}
    </div>
  )
}