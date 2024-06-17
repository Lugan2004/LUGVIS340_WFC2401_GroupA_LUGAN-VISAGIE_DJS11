import React from 'react';
import Link from 'next/link';

interface ListenNowButtonProps {
  podcastId: string;
}

const ListenNowButton: React.FC<ListenNowButtonProps> = ({ podcastId }) => {
  const href = `/podcast/${podcastId}`;

  return (
    <Link href={href} legacyBehavior>
      <button className="bg-zinc-700 text-white py-3 px-6 rounded-md mb-4 font-semibold border-2 border-gradient-to-r">
        Listen Now
      </button>
    </Link>
  );
};

export default ListenNowButton;