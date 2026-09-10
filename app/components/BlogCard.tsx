'use client'

import Link from "next/link"
import { BlogList } from "@/types/cat"
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card"

export type BlogCardProps = {
  blog: BlogList
}

export default function BlogCard({
  blog
}: BlogCardProps) {

    return (
      <Link href={`/blog/${blog.id}`}>
        <div className="flex-flex-col">
          <Card className="w-[400px] text-left flex-col rounded-2xl p-4 bg-white font-bold">
            <CardTitle className="text-green-500 font-bold">
              {new Date(blog.createdAt).toLocaleDateString("ja-JP")}
            </CardTitle>
            <CardContent className="text-2xl text-gray-700 p-0">
              {blog.title}
            </CardContent>
            <div className="text-gray-500">
              {blog.content}
            </div>

            <p className="text-orange-400">続きを読む →</p>
          </Card>
        </div>
      </Link>
    )
}