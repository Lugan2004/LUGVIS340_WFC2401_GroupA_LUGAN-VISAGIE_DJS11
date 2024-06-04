/* eslint-disable @next/next/no-img-element */
export default function Navbar() {
    return (
    <nav className="bg-zinc-800 p-4">
    <div className="flex items-center justify-between">
        <div>
            <img src="https://placehold.co/50x50" alt="Logo" className="h-8 w-8"/>
        </div>
        <div className="hidden md:flex space-x-4">
            <a href="../page" className="text-white hover:text-zinc-300">Home</a>
            <a href="../favourites" className="text-white hover:text-zinc-300">Favourites</a>
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