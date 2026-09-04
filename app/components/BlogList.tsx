'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { BlogList } from "@/types/cat"
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card"

export default function BlogPage() {

  const [blogs, setBlogs] = useState<BlogList[]>([])
  const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const getAllBlogs = async () => {
        const res = await fetch(`/api/blog`)
        const data = await res.json()
  
        setBlogs(data.blogs)
        setLoading(false)
      }
  
      getAllBlogs()
    },[])
  
    if (loading) return <p>loading</p>
    if (!blogs) return <p>記事が見つかりません</p>
  
    return (
      <ul className="grid grid-cols-2 max-w-[850px] mx-auto">
        {blogs.map((blog) => (
          <li key={blog.id}
            className="flex justify-center mt-5"
          >
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
                </Card>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
}