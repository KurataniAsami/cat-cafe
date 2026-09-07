'use client'

import Link from "next/link"
import { BlogCategory } from "@/types/cat"

type CategorySlugProps = {
  categories: BlogCategory[]
}

export default function CategorySidebar({
  categories,
}: CategorySlugProps) {

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