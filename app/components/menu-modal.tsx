'use client'

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { useModal } from "../context/modalContent";
import { useState } from "react";

export default function MenuModal() {
  // 選択した商品の数量を管理
  const [quantity, setQuantity] = useState(1)

  const { isOpen, closeModal, selectedMenu } = useModal()

  return (
    <div>
      <Dialog open={isOpen}
        // falseの場合（モーダルの外側をクリックした場合）
        onOpenChange={(open) => {
        if(!open) closeModal()
      }}>
        {/* stateの開閉処理だとカート処理などを実装した時,layoutからshopまでpropsを
            まわしていかないといけなくなるのでContext APIを使用する
        */}
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="lg:max-w-4xl">
          {selectedMenu && (
            <>
              <div className="flex gap-6">
                {/* 左 画像 */}
                <div className="relative aspect-square w-1/2 rounded-lg overflow-hidden">
                  {/* <Image
                    fill
                    src={"selectedMenu.imageUrl"}
                    alt={"selectedMenu.name"}
                    className="object-cover"
                  /> */}
                </div>

                {/* 右 詳細 */}
                <div className="flex flex-col flex-1 w-1/2">
                  {/* 上部：名前と単価 */}
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">{selectedMenu.name}</p>
                    <p className="text-lg font-semibold text-muted-foreground">
                      ￥{selectedMenu.price}
                    </p>
                  </div>

                  {/* 中央：数量セレクト */}
                  <div className="mt-4">
                    <label htmlFor="quantity" className="sr-only">
                      数量
                    </label>
                    <select
                      id="quantity"
                      name="quantity"
                      className="border rounded-full pr-8 pl-4 h-10"
                      aria-label="購入数量"
                      value={quantity}
                      // Numberで型を変換
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>

                    <DialogClose
                      type="button"
                      className="mt-6 h-14 text-lg font-semibold bg-black text-white rounded-md"
                    >
                      商品を追加（￥{selectedMenu.price * quantity}）
                    </DialogClose>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// カート
{/* <Drawer swipeDirection="right"> */}
        