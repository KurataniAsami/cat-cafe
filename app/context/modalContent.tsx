'use client'
// layout.tsxでchildrenをProviderで囲む

import { CatGoods } from "@/types/cat";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type ModalContextType = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  openModal: (menu: CatGoods) => void
  closeModal: () => void
  selectedMenu: CatGoods | null
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)  // Context作成

// モーダルの開閉の状態をContextでわたす
export const ModalProvider = ({ children } : { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<CatGoods | null>(null);  // 選択したメニュー

  const openModal = (menu: CatGoods) => {
    setIsOpen(true)
    setSelectedMenu(menu)
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedMenu(null)
  }

  return (
    <ModalContext.Provider value={{isOpen, setIsOpen, openModal, closeModal, selectedMenu}}>
      { children }
    </ModalContext.Provider>
  )
}

// 各コンポーネントで利用できるようにするためのカスタムフック(contextに格納)
// 必ずuseから始める
export const useModal = () => {
  const context = useContext(ModalContext);

  // providerの外側のコンポーネントでcontextを呼び出した場合、エラーを投げる
  if(!context) {
    throw new Error("useModalはModalProvider内で使用する必要があります")
  }

  // 通常
  return context;
}