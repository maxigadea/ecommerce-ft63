import { getProductDB } from "@/services/productService"
import ProductCard from "../Card/ProductCard"
import Link from "next/link";

const CardList = async () => {
  const preloadProducts = await getProductDB();
  return (
    <div className="flex flex-wrap items-center w-full justify-center gap-6 my-10">
        {
        preloadProducts.map((product) => {
            return (
              <Link key={product.id} href={`/product/${product.id}`}>
               <ProductCard key={product.id} {...product} />
              </Link>
            )
        })
      }
    </div>
  )
}

export default CardList