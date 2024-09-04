import Link from "next/link";
import React from "react";
import { Headphones } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 h-screen w-screen flex flex-col items-center justify-center space-y-8 p-4">
    <Headphones className="text-purple-500 w-24 h-24 animate-pulse" />
    <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center text-5xl font-bold transition-all duration-300 ease-in-out hover:scale-110">
      Welcome to the Podcast Playground
    </h1>
    <p className="text-zinc-400 text-center max-w-md">
      Discover, create, and immerse yourself in the world of podcasts. Your audio adventure starts here!
    </p>
    <Link href="../home">
      <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
        Enter the Playground
      </span>
    </Link>
  </div>
    
   );
}