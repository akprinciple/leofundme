import { useState } from 'react';
import { useReadContract } from 'wagmi';
import { parseAbi } from 'viem';
import { useAppKitAccount } from '@reown/appkit/react';
import { USER_ABI } from '../abi/users';
import UserProfile from './UserProfile';
import AdminPanel from './AdminPanel';
import readContract from '../hooks/useReadContract';

const CONTRACT_ADDRESS = "0x5d4D1E3e12eF06BC405f854Faf8a38E4D243CCc7";

export default function UserDashboard() {
  const { address } = useAppKitAccount();
  const [activeTab, setActiveTab] = useState<'profile' | 'admin'>('profile');
  const {ownerAddress} = readContract();
  // Example live read from the contract
  const { data: isPaused } = useReadContract({
    abi: parseAbi(USER_ABI as readonly string[]),
    address: CONTRACT_ADDRESS,
    functionName: 'isPaused'
  });

  const isAdmin = ownerAddress ? address?.toLowerCase() === (ownerAddress as string).toLowerCase() : false;

  return (
    <div className="p-6 md:p-10 font-sans max-w-7xl mx-auto">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-gray-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Dashboard</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Contract: <span className="font-mono bg-gray-800 px-2 py-1 rounded text-blue-400 select-all">{CONTRACT_ADDRESS}</span>
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3 bg-gray-800/50 p-3 rounded-lg border border-gray-700">
          <span className="text-sm font-medium text-gray-400">System Status:</span>
          <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${isPaused ? 'bg-red-900/50 text-red-400 border border-red-800' : 'bg-green-900/50 text-green-400 border border-green-800'}`}>
            {isPaused ? 'Paused' : 'Active'}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'profile' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30' : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'}`}
        >
          My Profile
        </button>
        {isAdmin && (
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center ${activeTab === 'admin' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30' : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            Admin Panel
          </button>
        )}
      </div>

      {/* Active Tab Content Area */}
      <div className="mt-6">
        {activeTab === 'profile' && <UserProfile />}
        {activeTab === 'admin' && isAdmin && <AdminPanel />}
      </div>
    </div>
  );
}