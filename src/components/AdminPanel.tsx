import { useState } from 'react';
import writeContract from '../hooks/useWriteContract';
import readContract from '../hooks/useReadContract';

export default function AdminPanel() {
  const [manageUsername, setManageUsername] = useState('');
  const { deleteUser } = writeContract();
  const {usersData } = readContract()
  

  const displayedUsers = (usersData as any[]);

  return (
    <div className="space-y-8">
      {/* MANAGE USER STATUS */}
      <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-3xl border border-gray-700 shadow-xl transition-all hover:border-gray-600">
        <h2 className="text-xl font-bold mb-6 text-white flex items-center">
          <span className="bg-yellow-500 w-2 h-6 rounded-full mr-3"></span> Manage User Status
        </h2>
        <div className="max-w-xl space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">Target Username</label>
            <input type="text" className="bg-gray-900 border border-gray-700 text-white text-sm rounded-xl focus:ring-yellow-500 focus:border-yellow-500 block w-full p-4 transition-colors" placeholder="Enter username..." value={manageUsername} onChange={e => setManageUsername(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            <button className="text-green-400 bg-green-900/30 border border-green-800 hover:bg-green-900/50 focus:ring-4 focus:ring-green-900 font-bold rounded-xl text-sm px-4 py-3 transition-colors shadow-lg">
              Make Active
            </button>
            <button className="text-yellow-400 bg-yellow-900/30 border border-yellow-800 hover:bg-yellow-900/50 focus:ring-4 focus:ring-yellow-900 font-bold rounded-xl text-sm px-4 py-3 transition-colors shadow-lg">
              Make Inactive
            </button>
            <button className="text-red-400 bg-red-900/30 border border-red-800 hover:bg-red-900/50 hover:text-red-300 focus:ring-4 focus:ring-red-900 font-bold rounded-xl text-sm px-4 py-3 transition-colors shadow-lg">
              Delete User
            </button>
          </div>
        </div>
      </div>

      {/* ALL USERS TABULAR VIEW */}
      <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-3xl border border-gray-700 shadow-xl overflow-hidden transition-all hover:border-gray-600">
        <h2 className="text-xl font-bold mb-6 text-white flex items-center">
          <span className="bg-purple-500 w-2 h-6 rounded-full mr-3"></span> All Registered Users
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-300 uppercase bg-gray-900/80 border-b border-gray-700">
              <tr>
                <th scope="col" className="px-6 py-4">ID</th>
                <th scope="col" className="px-6 py-4">Name</th>
                <th scope="col" className="px-6 py-4">Username</th>
                <th scope="col" className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user: any, idx: number) => (

                <tr key={user.id || idx} className="border-b border-gray-800 bg-gray-900/30 hover:bg-gray-800/60 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-500">#{idx + 1}</td>
                  <td className="px-6 py-4 font-bold text-white uppercase">{user}</td>
                  <td className="px-6 py-4">@{user}</td>
                 
                  
                  <td className="px-6 py-4 text-center">
                    <button type='button' onClick={() => setManageUsername(user.username)} className="px-4 py-2 bg-blue-900/30 text-blue-400 border border-blue-800 rounded-lg hover:bg-blue-900/50 font-medium transition-colors cursor-pointer">
                      View
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this user? This action is not reversible.")) {
                         deleteUser(user);
                        }
                      }} 
                      className="px-4 py-2 mx-1 bg-red-900/30 text-red-400 border border-red-800 rounded-lg hover:bg-red-900/50 font-medium transition-colors cursor-pointer">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}