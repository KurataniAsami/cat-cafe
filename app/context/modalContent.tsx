'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type ModalContextType = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)  // Context作成

// モーダルの開閉の状態をContextでわたす
export const ModalProvider = ({ children } : { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <ModalContext.Provider value={{isOpen, setIsOpen}}>
      { children }
    </ModalContext.Provider>
  )
}