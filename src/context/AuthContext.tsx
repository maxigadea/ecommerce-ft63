'use client'
import { IUserSession } from "@/types";
import React, {useContext, createContext, useEffect, useState} from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export interface IAuthContextProps {
    userData: IUserSession | null;
    setUserData: (userData: IUserSession | null) => void
    handleLogout: () => void
}

export const AuthContext = createContext<IAuthContextProps>({
    userData: null,
    setUserData: () => {},
    handleLogout: () => {}
});

export interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const router = useRouter()
    const [userData, setUserData] = useState<IUserSession | null>(null);
    const handleLogout = () => {
      router.push("/")
      alert("Te has deslogueado")
      setUserData(null);
      localStorage.removeItem("userSession")
      Cookies.remove("userSession")
      localStorage.removeItem("cart")
    }

    useEffect(() => {
        if(userData){
            localStorage.setItem("userSession", JSON.stringify({token: userData.token, user: userData.user}))
            Cookies.set("userSession", JSON.stringify({token: userData.token, user: userData.user}))
        }
    }, [userData])

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userSession")!)
        setUserData(userData)
    }, [])

    return (
        <AuthContext.Provider value={{userData, setUserData, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
};

//HOOK PARA USARLO
export const useAuth = () => useContext(AuthContext);