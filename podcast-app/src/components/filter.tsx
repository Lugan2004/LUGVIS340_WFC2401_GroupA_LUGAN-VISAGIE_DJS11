export default function Filter() {
    return (
        <div className="bg-zinc-900 p-4 rounded-lg flex space-x-4 border-b-4 border-t-4 border-gradient-to-r ">
          <button className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-md shadow">All</button>
          <button className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-md shadow">A-Z</button>
          <button className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-md shadow">Z-A</button>
          <button className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-md shadow">Newest</button>
          <button className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-md shadow">Oldest</button>
          <select className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-md shadow">
            <option>All Genres</option>
            
          </select>
        </div>
    )
}