'use client'

import { useRouter } from "next/navigation";
import React, { useState } from "react"

const Searchbar = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(searchQuery.length) {
            router.push(`/products/${searchQuery}`)
        } else {
            alert('Nothing to search')
        }

        setSearchQuery('')
    }

  return (

    <form className="flex flex-row gap-2 items-center justify-center outline-black border-1 p-2" onSubmit={handleSearch}>
        <input className="outline-none" placeholder="Search by name..." onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}></input>
        <button type="submit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="black" stroke-width="2"/>
                <line x1="21.0001" y1="21" x2="16.6464" y2="16.6464" stroke="black" stroke-width="2" stroke-linecap="round"/>
                </svg>
        </button>
    </form>
  )
}

export default Searchbar