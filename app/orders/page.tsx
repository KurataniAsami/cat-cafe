'use client'

import { useEffect, useState } from "react";
import OrderCard from "../components/order-card";
import { CatOrder } from "@/types/cat";

export default function OrdersPage() {

  const [orders, setOrders] = useState<CatOrder[]>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getOrders = async () => {
      const res = await fetch(`/api/orders`)
      const data = await res.json()
      setOrders(data)
      setLoading(false)
    }

    getOrders()
  },[])

  if(loading) return <p>loading...</p>

  return (
    <div className="space-y-4">
      <h1 className="text-center my-3 text-2xl">注文履歴</h1>
      {orders?.map((order) => (
        <OrderCard key={order.id} order={order}/>
      ))}
    </div>
  )
}