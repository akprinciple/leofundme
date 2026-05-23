import { useState } from 'react';
import readContract from '../hooks/useReadContract';


export default function LandingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const offset = (currentPage - 1) * itemsPerPage;

  const {isLoading, activeUsers} = readContract(); // Custom hook to read contract data (owner address and paused status)
  // const { data: usersData, isLoading } = useReadContract({
  //   abi: parseAbi(USER_ABI as readonly string[]),
  //   address: CONTRACT_ADDRESS,
  //   functionName: 'getAllUsers', // TODO: Update this if the function name is different
  //   args: [offset, itemsPerPage] // TODO: Remove or modify if the contract function doesn't take these args
  // });
  
  
  // Mock data for demonstration purposes, useful while connecting to the smart contract
  const mockUsers = [
    { id: 1, username: 'satoshi', name: 'Satoshi Nakamoto', status: 'Active' },
    { id: 2, username: 'vitalik', name: 'Vitalik Buterin', status: 'Active' },
    { id: 3, username: 'gavin', name: 'Gavin Wood', status: 'Inactive' },
    { id: 4, username: 'charles', name: 'Charles Hoskinson', status: 'Active' },
    { id: 5, username: 'dan', name: 'Dan Larimer', status: 'Active' },
    { id: 6, username: 'joseph', name: 'Joseph Lubin', status: 'Active' },
    { id: 7, username: 'hayden', name: 'Hayden Adams', status: 'Inactive' },
    { id: 8, username: 'ruja', name: 'Ruja Ignatova', status: 'Inactive' },
  ];

  // Fallback to mock data if the contract call has not returned array items
  const displayedUsers = (activeUsers as any[]) || [];

  return (
    <div className="p-6 md:p-10 font-sans max-w-7xl mx-auto">
      {/* Hero / Gifting Content Section */}
      <div className="text-center mb-16 py-12 px-4 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-3xl border border-gray-700/50 shadow-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
          Empower Dreams Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Gifting</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          LeoFundMe is a decentralized platform where you can discover amazing individuals and directly gift them funds to support their goals, projects, and dreams.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-900/30 hover:-translate-y-1">
            Start Gifting
          </button>
          <button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-full border border-gray-600 transition-all hover:-translate-y-1">
            Learn More
          </button>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">Discover Our Users</h2>
        <p className="text-gray-400 text-lg">Browse through the amazing people who have joined our platform and are ready to receive your support.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedUsers.map((user: any, index: number) => (
            <div key={user.id || index} className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 shadow-xl transition-all hover:border-gray-500 flex flex-col items-center text-center hover:-translate-y-1">
              {/* User Avatar / Logo Generator */}
              <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-900/20 mb-4">
                {user ? user.charAt(0).toUpperCase() : '?'}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{user || ''}</h3>
              <p className="text-gray-400 text-sm mb-4">@{user || ''}</p>
              <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${user.status === 'Active' ? 'bg-green-900/50 text-green-400 border border-green-800' : 'bg-red-900/50 text-red-400 border border-red-800'}`}>
                Active
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-12">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Previous
        </button>
        <span className="text-gray-400 font-medium">Page {currentPage}</span>
        <button 
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={displayedUsers.length < itemsPerPage}
          className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
}