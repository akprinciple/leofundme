import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseAbi } from 'viem';
import { USER_ABI } from '../abi/users';

const ABI = parseAbi(USER_ABI as readonly string[]);
const CONTRACT_ADDRESS = import.meta.env.VITE_USERS_CONTRACT_ADDRESS;
export default function readContract() {
 const { data: ownerAddress } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'owner',
  });
  const { data: isPaused } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'isPaused'
  });
  return { ownerAddress, isPaused };
}
