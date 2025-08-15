'use client'
import { useAuth } from "@/context/AuthContext"

const DashboardView = () => {
  const {userData} = useAuth();

  return (
    <div>
        <h1>Welcome: {userData?.user.name}</h1>

        <p>Your email: {userData?.user.email}</p>
        <p>Your address: {userData?.user.address}</p>
    </div>
  )
}

export default DashboardView