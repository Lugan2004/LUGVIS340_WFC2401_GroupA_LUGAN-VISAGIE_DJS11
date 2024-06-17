/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import ListenNowButton from './ListenNowBtn';

interface PodcastData {
  id: string;
  title: string;
  description: string;
  image: string;
  seasons: number;
  genres: string[];
  updated: string;
}

const CarouselComponent: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [data, setData] = useState<PodcastData[]>([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://podcast-api.netlify.app')
      .then(response => response.json())
      .then(data => setData(data));

    // Set up the automatic next button click interval
    const interval = setInterval(() => {
      handleNext();
    }, 10000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const handlePrevious = () => {
    setIndex(prevIndex => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setIndex(prevIndex => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
  };

  const truncateDescription = (description: string) => {
    const words = description.split(' ');
    return words.slice(0, 100).join(' ') + (words.length > 100 ? '...' : '');
  };

  return (
    <div className="h-96 w-full relative">
      <div className="carousel overflow-hidden">
        {data.map((item, idx) => (
          <div
            key={idx}
            className={`carousel-item absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
              idx === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              className="w-full h-96 object-cover"
              src={item.image}
              alt={item.title}
            />
            <div className="carousel-caption absolute inset-0 flex flex-col items-start justify-end text-white bg-gradient-to-t from-black p-8">
              <h3 className="text-3xl font-bold mb-4 font-serif">{item.title}</h3>
              <p className="text-lg mb-6 font-sans leading-6">
                {truncateDescription(item.description)}
              </p>
              {/* <ListenNowButton podcastId={PodcastData.id} /> */}
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-controls absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4 pointer-events-none">
        <button
          className="bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 pointer-events-auto"
          onClick={handlePrevious}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 pointer-events-auto"
          onClick={handleNext}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="carousel-indicators absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 pointer-events-none">
        {data.map((_, idx) => (
          <button
            key={idx}
            className={`h-4 w-4 rounded-full transition-colors duration-300 ${
              idx === index ? 'bg-white' : 'bg-gray-400'
            } pointer-events-auto`}
            onClick={() => handleSelect(idx)}
          />
        ))}
      </div>
      <div className="h-8 bg-gradient-to-r from-[#1A6DFF] to-[#C822FF]"></div>
    </div>
  );
};

export default CarouselComponent;