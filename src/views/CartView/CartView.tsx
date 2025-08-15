'use client'
import { useAuth } from "@/context/AuthContext";
import { createOrder } from "@/services/ordersService";
import { IProduct } from "@/types";
import { useEffect, useState } from "react"

const CartView = () => {
    const {userData} = useAuth();
    const [cart, setCart] = useState<IProduct[]>([]);
    const [totalCart, setTotalCart] = useState<number>(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
        if(storedCart) {
            let totalPrice = 0
            storedCart.map((product: IProduct) => {
                totalPrice = totalPrice + product.price
            })
            setTotalCart(totalPrice)
            setCart(storedCart)
        }
    }, [])

    const handleCheckout = async () => {
        if(userData?.token) {
            const idProducts = cart.map((products) => products.id)
            await createOrder(userData?.token, idProducts);
            localStorage.setItem("cart", "[]")
            setCart([])
            setTotalCart(0)
        }
    }

    const handleDelete = (id: number) => {
        const cart: IProduct[] | [] = JSON.parse(localStorage.getItem("cart") || "[]");
        const filteredCart = cart.filter((product: IProduct) => product.id != id)
        localStorage.setItem("cart", JSON.stringify(filteredCart))  
        setCart(filteredCart)
    }


  return (
    <div className="flex flex-row items-center justify-around w-full">
        <div>
                {cart.length ? 
                    cart.map((product) => {
                        return (
                            <div key={product.id}>
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                                <button onClick={() => handleDelete(product.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    </svg>
                                </button>
                            </div>
                        )
                    }) : (
                        <div>No tienes productos agregados a tu carrito</div>
                    )}
        </div>

        <div>
                    <p>Total: ${totalCart}</p>
                    <button onClick={handleCheckout}>Comprar</button>
        </div>
    </div>
  )
}

export default CartView