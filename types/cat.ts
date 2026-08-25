// 一覧表示の型
export type CatList = {
  id: number
  name: string
  sex: string
  profile: string
  ImageKey: string | null

  breed: {
    id: number
    name: string
  }
}

export type CatIndexResponse = {
  cats: CatList[]
}

// タイプ別表示
export type BreedIndexResponse = {
  breed: CatList[]
}