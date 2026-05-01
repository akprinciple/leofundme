import { useReadContract } from 'wagmi'
import { USER_ABI } from '../abi/users'



export function useIsUserContractPaused() {
  const result = useReadContract({
    abi: USER_ABI,
    address: "0x5d4D1E3e12eF06BC405f854Faf8a38E4D243CCc7",
    functionName: 'isPaused'
  })
  return result
}