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
                    <span className="font-bold text-2xl px-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1A6DFF] to-[#C822FF]">
                        Podcast Playground
                    </span>
                </div>
                <div className="flex items-center md:ml-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="py-2 px-4 rounded-md bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
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