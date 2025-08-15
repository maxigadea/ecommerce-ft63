import { ILoginProps, IRegisterProps } from "@/types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function register(userData: IRegisterProps) {
    try {
        const response = await fetch(`${APIURL}/users/register`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        const parsedResponse = await response.json()
        if(parsedResponse.name) {
            alert("Usuario registrado con exito")
            return response.json()
        } else {
            alert("Fallo al registrar el usuario")
        }
    } catch (error: any) {
        alert("Fallo al registrar el usuario" + error)
        throw new Error(error)
    }
}

export async function login(userData: ILoginProps) {
    try {
        const response = await fetch(`${APIURL}/users/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        const parsedResponse = await response.json()
        console.log(parsedResponse, "que me devuelve el backend")
        if(parsedResponse.login) {
            alert("Usuario logueado con exito")
            return parsedResponse;
        } else {
            alert("Fallo al logueado el usuario")
        }
    } catch (error: any) {
        alert("Fallo al logueado el usuario" + error)
        throw new Error(error)
    }
}

