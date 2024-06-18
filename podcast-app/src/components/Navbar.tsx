/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useState, useEffect, SetStateAction } from 'react';

interface PodcastData {
    id: string;
    title: string;
    description: string;
    image: string;
    seasons: number;
    genres: string[];
    updated: string;
  }

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://podcast-api.netlify.app/id/${searchTerm}`);
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (searchTerm.trim() !== '') {
            fetchData();
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    return (
        <nav className="bg-zinc-900 p-4 border-b-4 border-gradient-to-r font-Tahoma font-bold">
            <div className="flex items-center justify-between">
                <div className="flex flex-row items-center">
                <svg fill="none" viewBox="0 0 50 50" className='w-10 h-10' xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style={{ stopColor: '#1A6DFF', stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: '#C822FF', stopOpacity: 1 }} />
    </linearGradient>
  </defs>
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path d="M12 8C5.9365932 8 1 12.936593 1 19L1 41 A 1.0001 1.0001 0 0 0 2 42L38 42C44.063407 42 49 37.063407 49 31L49 9 A 1.0001 1.0001 0 0 0 48 8L12 8 z M 12 10L47 10L47 31C47 35.982593 42.982593 40 38 40L3 40L3 19C3 14.017407 7.0174068 10 12 10 z M 24.511719 18.75C21.111719 18.75 19 21.145 19 25C19 28.86 21.111719 31.257812 24.511719 31.257812C27.896719 31.257812 30 28.86 30 25C30 21.145 27.896719 18.75 24.511719 18.75 z M 9 19L9 31L10.859375 31L10.859375 26.806641L13.591797 26.806641C15.855797 26.806641 17.5 25.175734 17.5 22.927734C17.5 20.615734 15.899422 19 13.607422 19L9 19 z M 32 19L32 31L36.345703 31C39.886703 31 42 28.755094 42 24.996094C42 21.241094 39.886703 19 36.345703 19L32 19 z M 24.511719 20.345703C26.815719 20.345703 28.246094 22.129 28.246094 25C28.246094 27.876 26.815719 29.662109 24.511719 29.662109C22.192719 29.662109 20.753906 27.875 20.753906 25C20.753906 22.129 22.193719 20.345703 24.511719 20.345703 z M 10.859375 20.552734L13.226562 20.552734C14.871562 20.552734 15.742188 21.373734 15.742188 22.927734C15.742188 24.405734 14.825562 25.253906 13.226562 25.253906L10.859375 25.253906L10.859375 20.552734 z M 33.861328 20.568359L36.246094 20.568359C38.794094 20.568359 40.255859 22.188719 40.255859 25.011719C40.255859 27.819719 38.794094 29.431641 36.246094 29.431641L33.861328 29.431641L33.861328 20.568359 z" fill="url(#grad1)"></path>
  </g>
</svg>

                    <span className="font-bold text-2xl px-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1A6DFF] to-[#C822FF]">
                        Podcast Playground
                    </span>
                </div>

                <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/home" className="text-white hover:text-zinc-300 active:text-zinc-500 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        <Link href="/favourites" className="text-white hover:text-zinc-300 block px-3 py-2 rounded-md text-base font-medium">Favourites</Link>
                        <Link href="/" className="text-white hover:text-zinc-300">Sign In</Link>
                    </div>
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link href="/home" className="text-white hover:text-zinc-300 active:text-zinc-500">Home</Link>
                    <Link href="/favourites" className="text-white hover:text-zinc-300">Favourites</Link>
                    <Link href="/" className="text-white hover:text-zinc-300">Sign In</Link>
                </div>
                <button className="md:hidden text-white" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
                    </svg>
                </button>
            </div>
            {searchResults.length > 0 && (
                <div className="bg-zinc-800 p-4 mt-2 rounded-md">
                    <h2 className="text-white font-semibold mb-2">Search Results:</h2>
                    <ul>
                        {searchResults.map((result) => (
                            <li key={result} className="text-white">
                                {result}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    )
}