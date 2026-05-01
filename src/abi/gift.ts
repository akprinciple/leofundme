export const GIFT_ABI = [
  // ===== CONSTRUCTOR =====
  "constructor(address _usersContract, address _token, address _p2pContract)",

  // ===== ERRORS =====
  "error SafeERC20FailedOperation(address token)",

  // ===== EVENTS =====
  "event GiftClaimed(address indexed by, uint256 amount)",
  "event GiftSent(address indexed from, address indexed to, uint256 amount)",

  // ===== BALANCE =====
  "function Balance(address) view returns (uint256)",
  "function getBalance(address _user) view returns (uint256)",

  // ===== GIFT ACTIONS =====
  "function giftUser(string _username, uint256 _amount)",
  "function claimGiftByCrypto(uint256 _amount)",
  "function claimGiftByFiat(uint256 _tokenAmount, string _accountName, string _accountNumber, string _bankName)",

  // ===== WITHDRAWALS =====
  "function cancelPendingWithdrawal()",
  "function processFiatWithdrawal(address _user)",
  "function getPendingWithdrawal() view returns (uint256)",
  "function getPendingFiatWithdrawals() view returns (address[])",
  "function hasPendingWithdrawal(address) view returns (uint256)",
  "function pendingFiatWithdrawals(uint256) view returns (address)",

  // ===== HISTORY =====
  "function claimHistory(address, uint256) view returns (uint256 amount, bytes6 claimType, uint256 timestamp)",
  "function getClaimHistory(address _user) view returns (tuple(uint256 amount, bytes6 claimType, uint256 timestamp)[])",
  "function giftHistory(address, uint256) view returns (address from, uint256 amount, uint256 timestamp)",
  "function getGiftHistory(address _user) view returns (tuple(address from, uint256 amount, uint256 timestamp)[])",

  // ===== P2P INTEGRATION =====
  "function makeTransferByP2P(address _buyer, uint256 _orderId)",
  "function p2pContract() view returns (address)",

  // ===== DEPENDENCIES =====
  "function token() view returns (address)",
  "function usersContract() view returns (address)"
];