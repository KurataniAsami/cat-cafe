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

