'use client'
import { useAuth } from "@/context/AuthContext"
import { getOrders } from "@/services/ordersService";
import { IOrder } from "@/types";
import { useEffect, useState } from "react";

const OrdersView = () => {
    const {userData} = useAuth();
    const [orders, setOrders] = useState<IOrder[]>([]);

    const handleGetOrders = async () => {
        if(userData?.token) {
            const response = await getOrders(userData?.token)
            setOrders(response)
        }
    } 

    useEffect(() => {
        handleGetOrders();
    }, [userData])


  return (
    <div>
        {orders.length ? 
                    orders.map((order) => {
                        return (
                            <div key={order.id}>
                                <p>Order: N° {new Date(order.date).toTimeString()}</p>
                                <p>Status: {order.status}</p>
                                {
                                    order.products.map((product) => {
                                        return (
                                            <div key={product.id}>{product.name}</div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }) : (
                        <div>You don't have orders</div>
                    )}
    </div>
  )
}

export default OrdersView