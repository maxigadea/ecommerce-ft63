import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    if((pathname === "/dashboard" || pathname === "/cart") && !request.cookies.get("userSession")?.value) {
        //redirigirlo al home, porque es una de las rutas protegidas, y no esta logueado
        return NextResponse.redirect(new URL('/', request.url))
    } else if ((pathname === "/login" || pathname === "/register") && request.cookies.get("userSession")?.value) {
        //usuario logueado, no tiene sentido que fuerze ir al login o registro
        return NextResponse.redirect(new URL('/', request.url))
    } else {
        return NextResponse.next();
    }
}
 
