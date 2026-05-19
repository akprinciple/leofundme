import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseAbi } from 'viem';
import { USER_ABI } from '../abi/users';
import { useAppKitAccount } from '@reown/appkit/react';

const ABI = parseAbi(USER_ABI as readonly string[]);
const CONTRACT_ADDRESS = import.meta.env.VITE_USERS_CONTRACT_ADDRESS;
export default function readContract() {
  const { address } = useAppKitAccount();
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
  const { data: usersData, isLoading } = useReadContract({
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: 'getAllUsers', 
      args: [0, 10] 
    });
    const{ data: activeUsers } = useReadContract({
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: 'getActiveUsers', 
      args: [0, 10]
    });
    const {data: userName} = useReadContract({
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: 'addressToUsername', 
      args: [address] 
    });
    const { data: userInfo } = useReadContract({
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: 'getUserByUsername', 
      args: [userName] 
    });
    const { data: allUsers } = useReadContract({
    abi: parseAbi(USER_ABI as readonly string[]),
    address: CONTRACT_ADDRESS,
    functionName: 'getAllUsers',
    args: [0, 10] // Example pagination (offset, limit)
  });

  return { ownerAddress, isPaused, usersData, isLoading, activeUsers, userName, 
    userInfo, allUsers };
}
