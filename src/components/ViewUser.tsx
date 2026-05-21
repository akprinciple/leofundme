import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import readContract from '../hooks/useReadContract';
import writeContract from '../hooks/useWriteContract';
import { formatUnits } from 'viem';

export default function ViewUser() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  // Pass the extracted username into the hook to trigger the 'oneUser' read
  const { oneUser} = readContract(username);
  const { deleteUser } = writeContract();
  // If toggleUserStatus exists in your writeContract hook, cast or add it to the interface
  const { toggleUserStatus } = writeContract() as any; 

  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    if((oneUser as any)?.[0]?.length === 0) {
      setUser('0');
      return;
    }
    if (oneUser && username) {
      setUser({
        username: username,
        name: username, // Fallback to username since getUserByUsername doesn't return name
        email: (oneUser as any)?.[0] || 'N/A',
        balance: (oneUser as any)?.[1] != null ? formatUnits(BigInt((oneUser as any)[1]), 6) : '0',
        status: (oneUser as any)?.[2] ? 'Active' : 'Inactive'
      });
    }
  }, [oneUser, username]);

  if (!user) {
    return (
      <div className="p-6 md:p-10 font-sans max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
           <div className="h-12 w-12 bg-gray-700 rounded-full mb-4"></div>
           <div className="h-4 w-32 bg-gray-700 rounded mb-2"></div>
        </div>
        <p className="text-gray-400 mt-4">Looking for user "{username}"...</p>
        <button onClick={() => navigate(-1)} className="mt-6 text-blue-400 hover:text-blue-300 transition-colors">
          &larr; Go Back
        </button>
      </div>
    );
  }
    if (user === '0') {
    return (
      <div className="p-6 md:p-10 font-sans max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
        <div className="h-12 w-12 bg-gray-700 rounded-full mb-4"></div>
        <p className="text-gray-400 mt-4">User "{username}" not found.</p>
        <button onClick={() => navigate(-1)} className="mt-6 text-blue-400 hover:text-blue-300 transition-colors">
          &larr; Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 font-sans max-w-4xl mx-auto">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Dashboard
      </button>

      <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-gray-700">
          <div className="flex items-center space-x-5 mb-4 md:mb-0">
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-900/20">
              {(user.username || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white">{user.name || 'Unknown'}</h1>
              <p className="text-gray-400 text-lg">@{user.username || 'unknown'}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-sm text-gray-500 mb-1">Status</span>
             <span className={`px-4 py-1.5 text-sm font-bold rounded-full uppercase tracking-wider ${user.status === 'Active' ? 'bg-green-900/50 text-green-400 border border-green-800' : 'bg-red-900/50 text-red-400 border border-red-800'}`}>
              {user.status || 'Unknown'}
             </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-700">
            <p className="text-sm text-gray-400 mb-2">Email Address</p>
            <p className="text-gray-200 font-medium text-lg">{user.email || 'N/A'}</p>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-700">
            <p className="text-sm text-gray-400 mb-2">Balance</p>
            <p className="text-gray-200 font-medium text-lg">{user.balance || '0'} USDC</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-800">
          <div className="flex items-center space-x-4 mr-auto bg-gray-900/80 px-6 py-4 rounded-xl border border-gray-700">
            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-200">Active Status</span>
              <span className="text-xs text-gray-500">Toggle to activate/deactivate</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer ml-4">
              <input 
                type="checkbox" 
                title='User Status'
                className="sr-only peer"
                checked={user.status === 'Active'}
                onChange={() => {
                  const isActive = user.status === 'Active';
                  if (toggleUserStatus) toggleUserStatus(user.username, !isActive);
                  // Optimistic update for UI
                  setUser({...user, status: isActive ? 'Inactive' : 'Active'});
                }} 
              />
              <div className="w-14 h-7 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <button 
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete @${user.username}? This action is not reversible.`)) {
                if (deleteUser) deleteUser(user.username);
                navigate(-1); // Automatically go back after delete request is sent
              }
            }}
            className="text-red-400 bg-red-900/30 border border-red-800 hover:bg-red-900/50 hover:text-red-300 focus:ring-4 focus:ring-red-900 font-bold rounded-xl text-base px-8 py-4 transition-colors shadow-lg flex items-center justify-center cursor-pointer">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
}