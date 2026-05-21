import React from 'react';
import { useAppKitAccount, useAppKit } from '@reown/appkit/react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();

  if (isConnected) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center">
      <div className="bg-gray-800/40 p-10 rounded-3xl border border-gray-700 shadow-2xl max-w-lg w-full flex flex-col items-center backdrop-blur-sm">
        <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30 text-4xl mb-6">
          L
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Connect Your Wallet</h2>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          You need to connect your Web3 wallet to access the dashboard and manage users.
        </p>
        <button onClick={() => open()} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/30 hover:-translate-y-1 w-full text-lg">
          Connect Wallet
        </button>
      </div>
    </div>
  );
}