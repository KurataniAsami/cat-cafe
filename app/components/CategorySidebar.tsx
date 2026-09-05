'use client'

import { BlogCategory } from "@/types/cat"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"

type CategorySlugProps = {
  categories?: BlogCategory[]
}

export default function CategorySidebar({
  categories
}: CategorySlugProps) {

  const [catBlogCategory, setCatBlogCategory] = useState<BlogCategory[]>([])
  
  const { slug } = useParams<{ slug: string }>()
  
  return (
    <div>
      <h1>サイドバー</h1>
      {categories?.map((category) => (
        <div key={category.id}>
          <Link href={`/blog/category/${category.slug}`}>
            {category.name}
          </Link>
        </div>
      ))}
    </div>
  )
}