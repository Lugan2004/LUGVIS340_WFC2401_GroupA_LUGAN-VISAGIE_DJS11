import Link from 'next/link';

const ListenNowButton: React.FC = () => {
  const href = '../podcast';

  return (
    <Link href={href} legacyBehavior>
      <button className="bg-zinc-700 text-white py-3 px-6 rounded-md mb-4 font-semibold border-2 border-gradient-to-r">
        Listen Now
      </button>
    </Link>
  );
};

export default ListenNowButton;