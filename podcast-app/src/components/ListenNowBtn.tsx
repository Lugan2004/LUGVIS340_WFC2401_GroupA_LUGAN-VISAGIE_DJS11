import React from 'react';
import Link from 'next/link';

interface ListenNowButtonProps {
  podcastId: string;
}

const ListenNowButton: React.FC<ListenNowButtonProps> = ({ podcastId }) => {
  const href = `/podcast/${podcastId}`;

  return (
    <Link href={href} legacyBehavior>
      <button className="bg-zinc-700 text-white py-3 px-6 br-md mb-4 font-semibold rounded-md transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#1A6DFF] hover:to-[#C822FF]">
        Listen Now
      </button>
    </Link>
  );
};

export default ListenNowButton;