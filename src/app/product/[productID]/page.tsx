import { getProductByID } from '@/services/productService';
import { ProductIDPageProps } from '@/types/pageProps';
import ProductDetailView from '@/views/ProductDetailView/ProductDetailView';
import React from 'react'

const ProductIDPage: React.FC<ProductIDPageProps> = async ({params}) => {
    const {productID} = await params;
    const productDetail = await getProductByID(productID)

  return (
    <ProductDetailView {...productDetail} />
  )
}

export default ProductIDPage