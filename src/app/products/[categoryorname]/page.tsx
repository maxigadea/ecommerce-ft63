import ProductCard from '@/components/Card/ProductCard';
import { getProductByCategoryOrName } from '@/services/productService';
import { FilterPageProps } from '@/types/pageProps';
import Link from 'next/link';
import React from 'react'

const FilterPage: React.FC<FilterPageProps> = async ({params}) => {
    const {categoryorname} = await params;
    const filteredProducts = await getProductByCategoryOrName(categoryorname)
    return (
    <div className="flex flex-wrap items-center w-full justify-center gap-6 my-10">
        

        {
        filteredProducts.map((product) => {
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

export default FilterPage