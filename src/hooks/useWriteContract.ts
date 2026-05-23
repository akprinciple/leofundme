import { useWriteContract } from "wagmi";
import { parseAbi, BaseError, ContractFunctionRevertedError } from "viem";
import { USER_ABI } from "../abi/users";
import { useAppKitAccount } from "@reown/appkit/react";
import { toast } from "react-toastify/unstyled";

const ABI = parseAbi(USER_ABI as readonly string[]);

// Fallback to the hardcoded address used in other components if the env var is missing
const CONTRACT_ADDRESS = import.meta.env.VITE_USERS_CONTRACT_ADDRESS;

export default function writeContract() {
  const { address } = useAppKitAccount();
  const { writeContractAsync: wagmiWriteContractAsync, ...rest } = useWriteContract();

  const addUserDetails = async (username: string, name: string, email: string) => {
    try {
       await wagmiWriteContractAsync({
          abi: ABI,
          address: CONTRACT_ADDRESS as `0x${string}`,
          functionName: "addUser",
          args: [username, name, email],
        });
        
    } catch (error) {
      console.error("Transaction Error:", error);
      let errorMessage = "Registration Failed.";

      if (error instanceof BaseError) {
        // Walk the error tree to find the specific revert error
        const revertError = error.walk(err => err instanceof ContractFunctionRevertedError);
        if (revertError instanceof ContractFunctionRevertedError) {
          const errorName = revertError.data?.errorName ?? "";
          errorMessage = `Reverted: ${errorName || revertError.reason || revertError.shortMessage}`;
        } else {
          errorMessage = error.shortMessage || error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = (error as any)?.shortMessage || error.message;
      }

      console.log(errorMessage);
    }
  };
  const deleteUser = async (username: string) => {
    try {
      const tx = await wagmiWriteContractAsync({
          abi: ABI,
          address: CONTRACT_ADDRESS as `0x${string}`,
          functionName: "deleteUser",
          args: [username],
        });
    } catch (error) {
      console.error("Transaction Error:", error);
    }
  };
  const makeActive = async (username: string) => {
    try {      const tx = await wagmiWriteContractAsync({
          abi: ABI,
          address: CONTRACT_ADDRESS as `0x${string}`,
          functionName: "makeActive",
          args: [username],
        });
        toast.success(`User "${username}" is now Active!`);
    } catch (err) {
      console.log("Transaction Error:", err);
    }
  };
  const makeInactive = async (username: string) => {
    try {
      const tx = await wagmiWriteContractAsync({
          abi: ABI,
          address: CONTRACT_ADDRESS as `0x${string}`,
          functionName: "makeInactive",
          args: [username],
        });
        toast.success(`User "${username}" is now Inactive!`);
    } catch (err) {
      console.log("Transaction Error:", err);
    }

  };
  const pause = async () => {
    try {
      const tx = await wagmiWriteContractAsync({
          abi: ABI,
          address: CONTRACT_ADDRESS as `0x${string}`,
          functionName: "pause",
        });
        toast.success(`Withdrawal is now Paused!`);
    } catch (err) {
      console.log("Transaction Error:", err);
    }
  };

  return { addUserDetails, deleteUser, makeActive, makeInactive, ...rest, pause };
}