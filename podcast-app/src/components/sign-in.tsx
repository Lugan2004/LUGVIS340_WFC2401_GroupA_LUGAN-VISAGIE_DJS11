export default function SignIn(){
    return(
<body className="bg-zinc-800 flex justify-center items-center min-h-screen">
    <form className="max-w-md mx-auto p-6 bg-zinc-700 shadow-md rounded-md bg-zinc-800 border-b-4 border-gradient-to-r">
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Sign In</h2>
        <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300">Email</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-zinc-800 text-zinc-300" placeholder="Enter your email" />
        </div>
        <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300">Password</label>
            <input type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-zinc-800 text-zinc-300" placeholder="Enter your password" />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-colors duration-300"><a href="../home" className="font-bold">Sign In</a></button>
        <p className="mt-4 text-center text-zinc-400">
            No account?
            <a href="#" className="ml-2 text-blue-500 hover:text-blue-600 transition-colors duration-300">Sign Up</a>
        </p>
    </form>
</body>
                
    
    )
}