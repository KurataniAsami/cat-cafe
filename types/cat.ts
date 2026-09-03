// 一覧表示の型
export type CatList = {
  id: number
  name: string
  sex: string
  birthday: string
  ImageKey: string | null

  breed: {
    id: number
    name: string
    slug: string
  }
}

export type CatIndexResponse = {
  cats: CatList[]
}

// タイプ別表示
export type BreedIndexResponse = {
  breed: Breed[]
}

export type Breed = {
  id: number
  name: string
  slug: string
}

// ブログ一覧表示
export type BlogList = {
  id: number
  title: string
  content: string
  thumbnailImageKey: string
  createdAt: Date

  catBlogCategory: {
    id: number
    name: string
  }
}

export type BlogIndexResponse = {
  blogs: BlogList[]
}

// ブログカテゴリー表示
export type BlogCategory = {
  id: number
  name: string
}

export type BlogCategoryIndexResponse = {
  categories: BlogCategory[]
}