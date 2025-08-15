"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, User, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/Sheet/Sheet"
import { Badge } from "@/components/Badge/Badge"
import { Button } from "@/components/Button/Button"
import { useAuth } from "@/context/AuthContext"
import Searchbar from "../Searchbar/Searchbar"

export default function Navbar() {
  // Estado para simular si el usuario está logueado
  const {userData, handleLogout} = useAuth()
  // Estado para el menú móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Estado para simular items en el carrito
  const [cartItems, setCartItems] = useState(3)

  return (
    <nav className=" w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">E</span>
          </div>
          <span className="font-bold text-xl">EcomStore</span>
        </Link>

        <div className="flex flex-col items-center gap-4 justify-center">
          <Searchbar />
          <div>
            <Link href="/products/1">Cellphone</Link>
            <Link href="/products/2">Laptop</Link>
          </div>
        </div>
        

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {userData?.token ? (
            <>
              {/* Carrito */}
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartItems}
                    </Badge>
                  )}
                  <span className="sr-only">Carrito de compras</span>
                </Button>
              </Link>

              {/* Dashboard */}
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Button>
              </Link>

              {/* Botón para simular logout */}
              <Button onClick={handleLogout} variant="outline" size="sm">
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link href="/login">
                <Button variant="default" size="sm">
                  Iniciar Sesión
                </Button>
              </Link>

              
            
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-6">
                <div className="flex items-center space-x-2 pb-4 border-b">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">E</span>
                  </div>
                  <span className="font-bold text-xl">EcomStore</span>
                </div>

                {userData?.token ? (
                  <>
                    {/* Carrito Mobile */}
                    <Link
                      href="/cart"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="relative">
                        <ShoppingCart className="h-5 w-5" />
                        {cartItems > 0 && (
                          <Badge
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                          >
                            {cartItems}
                          </Badge>
                        )}
                      </div>
                      <span>Carrito ({cartItems})</span>
                    </Link>

                    {/* Dashboard Mobile */}
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <User className="h-5 w-5" />
                      <span>Mi Dashboard</span>
                    </Link>

                    <div className="pt-4 border-t">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => {
                          
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        Cerrar Sesión
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Login Mobile */}
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                      <Button className="w-full">Iniciar Sesión</Button>
                    </Link>

                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                      
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      Simular Login
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
