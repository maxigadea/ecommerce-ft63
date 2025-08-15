import { IProduct } from "@/types";
const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductDB(): Promise<IProduct[]> {
    try {
        const response = await fetch(`${APIURL}/products`, {
            next: {revalidate: 360}
        })
        const products: IProduct[] = await response.json();
        return products;
    } catch (error: any) {
        throw new Error(error)
    }
}


export async function getProductByID(id: string): Promise<IProduct> {
    try {
     const response = await getProductDB();
     const productFiltered = response.find((product) => product.id.toString() === id)
     if(!productFiltered) throw new Error("Product not found")
     return productFiltered;
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function getProductByCategoryOrName(categoryIdOrName: string) {
    try {
        const response = await getProductDB();

         // Limpiar la categoría o nombre para evitar problemas con caracteres especiales
        const cleanedQuery = decodeURIComponent(categoryIdOrName) // Decodifica los caracteres codificados en URL
            .replace(/[^a-zA-Z0-9\s]/g, '') // Elimina caracteres no alfanuméricos
            .trim(); // Elimina espacios al inicio y al final


        //Filtrar por category
        let productFiltered = response.filter((product) => product.categoryId.toString() === cleanedQuery)

        //Si no encuentra ese categoryid, intentamos filtrar por name
        if(!productFiltered.length) {
            productFiltered = response.filter((product) => product.name.toLocaleLowerCase().includes(cleanedQuery.toLocaleLowerCase()))

            if(!productFiltered.length) {
                productFiltered = []
            }
        }

        return productFiltered
    } catch (error: any) {
        throw new Error(error)
    }
}