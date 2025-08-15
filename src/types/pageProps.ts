export interface ProductIDPageProps {
  params: Promise<{ productID : string}> 
}

export interface FilterPageProps {
  params: Promise<{ categoryorname : string}> 
}