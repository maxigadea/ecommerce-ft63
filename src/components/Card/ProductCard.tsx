import { IProduct } from "@/types"


const ProductCard: React.FC<IProduct> = ({name, price, image}) => {
  return (
    <div className=" flex-col min-w-[300px] min-h-[300px] flex items-center justify-center p-2 rounded-2xl border-black">
        <h1>{name}</h1>
        <img className="h-auto w-full max-w-[160px]" src={image} alt="Imagen del producto:" />
        <p>Price: ${price}</p>
    </div>
  )
}

export default ProductCard