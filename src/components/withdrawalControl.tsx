import { useEffect } from 'react';
import { useWaitForTransactionReceipt } from 'wagmi';
import { toast } from 'react-toastify';
import writeContract from '../hooks/useWriteContract';
import readContract from '../hooks/useReadContract';


export default function WithdrawalControl() {
  const { pause, data: hash, isPending,  } = writeContract() as any;
  const { isPaused, refetchPaused,  } = readContract();
  

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      refetchPaused();
      toast.success("System status updated successfully!");
    }
  }, [isConfirmed, refetchPaused]);

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-3xl border border-gray-700 shadow-xl transition-all hover:border-gray-600">
      <h2 className="text-xl font-bold mb-6 text-white flex items-center">
        <span className="bg-red-500 w-2 h-6 rounded-full mr-3"></span> System Controls
      </h2>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-900/50 p-6 rounded-2xl border border-gray-700">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-bold text-white mb-1">Withdrawal Status: <span className={isPaused ? "text-red-400" : "text-green-400"}>{isPaused ? 'Paused' : 'Active'}</span></h3>
          <p className="text-gray-400 text-sm">When paused, withdrawals are disabled.</p>
        </div>
        <button 
          onClick={() => {
            if (isPaused) {
              if (pause) { pause(); toast.info("Unpausing withdrawals..."); }
              else toast.error("pause function not found in useWriteContract");
            } else {
              if (pause) { pause(); toast.info("Pausing withdrawals..."); }
              else toast.error("pause function not found in useWriteContract");
            }
          }}
          disabled={isPending || isConfirming || isPaused === undefined}
          className={`px-6 py-3 font-bold rounded-xl transition-colors shadow-lg flex-shrink-0 ${
            isPaused 
              ? 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/30' 
              : 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/30'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isPending || isConfirming ? 'Processing...' : isPaused ? 'Unpause Withdrawals' : 'Pause Withdrawals'}
        </button>
      </div>
    </div>
  );
}