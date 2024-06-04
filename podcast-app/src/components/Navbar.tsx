/* eslint-disable @next/next/no-img-element */

export default function Navbar() {
    return (
        
        <nav className="bg-zinc-800 p-4 border-b-4 border-gradient-to-r font-Tahoma">
        <div className="flex items-center justify-between">
        <div className="flex flex-row items-center">
            <img src="data:image/png;base64,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" className="h-12 w-12" alt="logo"/>
            <span className="font-bold text-2xl px-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1A6DFF] to-[#C822FF]">
                Podcast Playground
            </span>
        </div>
        <div className="hidden md:flex space-x-4">
            <a href="/home" className="text-white hover:text-zinc-300">Home</a>
            <a href="/favourites" className="text-white hover:text-zinc-300">Favourites</a>
            
        </div>
        <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
        </button>
    </div>
    </nav>

    )
}