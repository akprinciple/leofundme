export const USER_ABI = [
  // ===== USER MANAGEMENT =====
  "function addUser(string _username, string _name, string _email)",
  "function deleteUser(string _username)",
  "function makeActive(string _username)",
  "function makeInactive(string _username)",

  // ===== USER QUERIES =====
  "function getUserByUsername(string _username) view returns (string, uint256, bool)",
  "function getActiveUsers(uint256 offset, uint256 limit) view returns (string[])",
  "function getAllUsers(uint256 offset, uint256 limit) view returns (string[])",
  "function getInactiveUsers(uint256 offset, uint256 limit) view returns (string[])",

  // ===== MAPPINGS (READ) =====
  "function addressToUsername(address) view returns (string)",
  "function usernameToAddress(string) view returns (address)",
  "function emailExists(string) view returns (bool)",

  // ===== USER STORAGE =====
  "function userInfo(address) view returns (string name, string email, uint256 bal, bool status)",
  "function userNames(uint256) view returns (string)",

  // ===== SYSTEM STATE =====
  "function isPaused() view returns (bool)",
  "function isItPaused() view returns (bool)",

  // ===== ADMIN =====
  "function owner() view returns (address)",
  "function pause()"
];