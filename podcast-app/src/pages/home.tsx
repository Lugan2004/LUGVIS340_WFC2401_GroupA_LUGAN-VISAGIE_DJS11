import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../app/globals.css';
import CarouselComponent from '@/components/carousel';
import PodcastCards from '@/components/cards';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a data fetch delay for demonstration purposes
    const fetchData = async () => {
      try {
        // Simulate a fetch delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-700 text-white">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-700 font-sans-serif">
    {isLoading ? (
      <div className="flex justify-center items-center min-h-screen bg-zinc-700 text-white">
        <div className="loader"></div>
      </div>
    ) : (
      <>
        <Navbar />
        <CarouselComponent />
        <PodcastCards setIsLoading={setIsLoading} />
      </>
    )}
  </div>
);
}

