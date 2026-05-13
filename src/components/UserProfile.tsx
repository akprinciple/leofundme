import { useState, useEffect } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';

import readContract from '../hooks/useReadContract';



export default function UserProfile() {
  const { address } = useAppKitAccount();
  const { ownerAddress, isPaused } = readContract(); // Custom hook to read contract data (owner address and paused status)
  
  const [addUserData, setAddUserData] = useState({ username: '', name: '', email: '' });
  
  const { writeContract, data: hash, isPending } = useWriteContract();

  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash, // This hash is returned by useWriteContract once the user signs the transaction
  });

  

  const [isRegistered, setIsRegistered] = useState(false);

  // If the transaction is confirmed, or if we fetch existing user data, set registered to true
  useEffect(() => {
    
  }, []);

 

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm p-6 md:p-10 rounded-3xl border border-gray-700 shadow-2xl transition-all">
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
        <span className="bg-blue-600 w-2 h-6 rounded-full mr-3"></span> My Profile
      </h2>
    {ownerAddress as string}
      {!isRegistered ? (
        <div className="space-y-5 max-w-lg">
          <p className="text-gray-400 text-sm mb-6">You haven't set up your profile yet. Please add your details below.</p>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">Username</label>
            <input type="text" className="bg-gray-900 border border-gray-700 text-white text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4 transition-colors" placeholder="e.g. satoshi" value={addUserData.username} onChange={e => setAddUserData({...addUserData, username: e.target.value})} />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">Full Name</label>
            <input type="text" className="bg-gray-900 border border-gray-700 text-white text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4 transition-colors" placeholder="e.g. Satoshi Nakamoto" value={addUserData.name} onChange={e => setAddUserData({...addUserData, name: e.target.value})} />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">Email Address</label>
            <input type="email" className="bg-gray-900 border border-gray-700 text-white text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4 transition-colors" placeholder="satoshi@bitcoin.org" value={addUserData.email} onChange={e => setAddUserData({...addUserData, email: e.target.value})} />
          </div>
          <button 
            // onClick={handleSaveDetails}
            disabled={isPending || isConfirming}
            className="w-full text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed focus:ring-4 focus:ring-blue-900 font-bold rounded-xl text-lg px-5 py-4 mt-4 transition-all shadow-lg shadow-blue-900/30 flex justify-center items-center">
            {isPending ? 'Confirm in Wallet...' : isConfirming ? 'Saving to Blockchain...' : 'Save Details'}
          </button>
        </div>
      ) : (
        <div className="bg-gray-900/60 border border-gray-700 p-8 rounded-2xl max-w-lg shadow-inner">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-900/20">
              {addUserData.username ? addUserData.username.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{addUserData.name || 'Anonymous User'}</h3>
              <p className="text-gray-400 text-lg">@{addUserData.username || 'unknown'}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-gray-500 font-medium">Email</span>
              <span className="text-gray-200">{addUserData.email || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-gray-500 font-medium">Connected Wallet</span>
              <span className="text-blue-400 font-mono text-sm bg-blue-900/20 px-3 py-1 rounded-lg border border-blue-900/50">
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected'}
              </span>
            </div>
            <div className="flex justify-between pb-2 items-center">
              <span className="text-gray-500 font-medium">Status</span>
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-900/50 text-green-400 border border-green-800 uppercase tracking-wider">Active</span>
            </div>
          </div>

          <button 
            onClick={() => setIsRegistered(false)} 
            className="mt-8 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors w-full text-center py-2 bg-gray-800/50 rounded-lg hover:bg-gray-800">
            Edit Profile Details
          </button>
        </div>
      )}
    </div>
  );
}