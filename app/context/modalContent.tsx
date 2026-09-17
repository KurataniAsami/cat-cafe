import { createContext } from "react";

const ModalContext = createContext(undefined)  // Context作成

export const ModalProvider = ({ clildren } : { children: ReactNode})