'use client'
import { useAuth } from '@/context/AuthContext'
import { IProduct } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const ProductDetailView: React.FC<IProduct> = ({id, name, image, description, stock, price, categoryId}) => {
  const router = useRouter()
  const [productExit, setProductExit] = useState(false); 
  const {userData} = useAuth();
  const handleAddToCart = () => {
    if(!userData?.token) {
      alert("You must be logged to add products")
    } else {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const productExist = cart.some((item) => {
        if(item.id === id) return true
        return false;
      })
      if(productExist) {
        setProductExit(productExist)
        alert("You already have this product in your cart")
      } else {
        setProductExit(productExist)
        cart.push({
          id,
          name,
          image,
          description,
          stock,
          price,
          categoryId
        })
        localStorage.setItem("cart", JSON.stringify(cart))
        router.push("/cart")
        alert("Product added to your cart")
      }
    }
  }

  return (
    <div>
      <h1>{name}</h1>
      <img src={image} alt="Imagen del producto" />
      <p>{description}</p>
      <p>Stock: {stock}</p>
      <p>Price: ${price}</p>
      <button disabled={productExit} onClick={handleAddToCart}>Add to cart</button>
    </div>
  )
}

export default ProductDetailView