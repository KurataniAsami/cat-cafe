'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function BlogForm() {
  <div className="flex flex-col items-center mt-5 py-3">
      <h1 className="text-2xl">記事の作成</h1>
      <form
        onSubmit={handleSubmit}
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
            className="border border-gray-200 rounded-md px-2 py-0.5 w-[180px]"
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
            className="border border-gray-200 rounded-md px-2 py-0.5 w-[180px]"
          />
        </div>


        <div className="mt-2">
          <label>
            種類
          </label>
          <Select
            value={breedId === null ? "" : String(breedId)}  // placeholderを表示させる
            onValueChange={(value) => setBreedId(Number(value))}
          >
            <SelectTrigger className="w-[180px] mt-1">
              <SelectValue>
                {breedId === null
                  ? "品種を選択"
                  : breeds.find((b) => b.id === breedId)?.name}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {breeds.map((breed) => (
                  <SelectItem
                    key={breed.id}
                    value={String(breed.id)}
                  >
                    {breed.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        

        <div className="flex justify-between items-center mt-2 pt-4">
          {/* <label htmlFor="ImageKey">
            <ImageIcon/>
          </label>
          <input
            type="file"
            id="ImageKey"
            onChange={handleImageUpload}
            className="sr-only"
          /> */}

          <button
            type="submit"
            className="bg-orange-400 text-white rounded-3xl font-bold px-4 py-2 mt-3"
          >
            作成する
          </button>
          </div>
      </form>
    </div>
}