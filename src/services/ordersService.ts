
const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function createOrder(token: string, products: number[]) {
    try {
        const response = await fetch(`${APIURL}/orders`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({products})
        })
        if(response.ok) {
            alert("La compra se realizó con éxito")
            return response.json()
        } else {
            alert("La compra no se pudo realizar")
        }
    } catch (error: any) {
        alert("Fallo al registrar el usuario" + error)
        throw new Error(error)
    }
}

export async function getOrders(token: string) {
    try {
        const response = await fetch(`${APIURL}/users/orders`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: token
            },
        })
        return response.json();
    } catch (error: any) {
        alert("Fallo al registrar el usuario" + error)
        throw new Error(error)
    }
}


