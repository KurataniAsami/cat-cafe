import { CartItem } from "@/types/cat";
import useSWR from "swr";

type CartResponse = {
  cartItems: CartItem[]
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  const data = await response.json();
  return data;
};

export function useCart( enabled = true) {
  const {
    data: carts,
    error: cartsError,
    isLoading,
    mutate: mutateCart,  // データを更新する
  } = useSWR<CartResponse[]>(`/api/cart`,
      fetcher,
    {
      isPaused: () => !enabled,
    }
  );

  return { carts, cartsError, isLoading, mutateCart };
}

// npm install swr