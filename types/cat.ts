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
  }
}

export type CatIndexResponse = {
  cats: CatList[]
}

// タイプ別表示
export type BreedIndexResponse = {
  breed: CatList[]
}

export type Breed = {
  id: number
  name: string
}