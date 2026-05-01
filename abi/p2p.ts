export const p2pAbi = [
  /* ========== EVENTS ========== */
  "event OrderCancelled(address indexed seller, uint256 indexed orderId)",
  "event OrderCompleted(address indexed seller, uint256 indexed orderId)",
  "event OrderCreated(uint256 indexed orderId, address indexed seller, uint256 tokenAmount, uint256 expectedFiatAmount)",
  "event OrderLocked(uint256 indexed orderId, address indexed buyer, address indexed seller)",
  "event OrderReceived(address indexed seller, address indexed buyer, uint256 indexed orderId)",

  /* ========== BUYER MANAGEMENT ========== */
  "function addNewBuyer(address _buyer, string _buyerName, uint256 unitPrice) external",
  "function changeBuyerStatus(address _buyer) external",
  "function getBuyerInfo(address _buyer) external view returns (tuple(address buyerAddress, string buyerName, uint256 unitPrice, uint256 totalOrders, uint256 totalVolume, uint256 rank, bool buyerStatus))",
  "function getBuyerInfoByAddress(address _buyer) external view returns (tuple(address buyerAddress, string buyerName, uint256 unitPrice, uint256 totalOrders, uint256 totalVolume, uint256 rank, bool buyerStatus))",
  "function getAllBuyers(uint256 offset, uint256 limit) external view returns (tuple(address buyerAddress, string buyerName, uint256 unitPrice, uint256 totalOrders, uint256 totalVolume, uint256 rank, bool buyerStatus)[])",
  "function getBuyerCount() external view returns (uint256)",
  "function getBuyerPendingOrders(address _buyer) external view returns (uint256[])",

  /* ========== ORDER MANAGEMENT ========== */
  "function createOrder(address _seller, uint256 _tokenAmount, string _accountName, string _accountNumber, string _bankName) external",
  "function lockOrder(address _seller, address _buyer, uint256 _orderId) external",
  "function receiveOrder(address _seller, address _buyer, uint256 _orderId) external",
  "function completeOrder(address _buyer, uint256 _orderId) external",
  "function cancelOrder(address _user, uint256 _orderId) external",
  "function settleDispute(uint256 _orderId, bool favorSeller) external",

  /* ========== ORDER QUERIES ========== */
  "function getOrder(uint256 _orderId) external view returns (tuple(address seller, address buyer, uint256 tokenAmount, uint256 expectedFiatAmount, string accountName, string accountNumber, string bankName, uint8 status))",
  "function orders(uint256) external view returns (address seller, address buyer, uint256 tokenAmount, uint256 expectedFiatAmount, string accountName, string accountNumber, string bankName, uint8 status)",
  "function orderCount() external view returns (uint256)",
  "function getActiveOrderId(address _seller) external view returns (uint256)",
  "function activeOrderId(address) external view returns (uint256)",

  /* ========== BUYER TRANSACTIONS ========== */
  "function buyerPendingTrans(address, uint256) external view returns (uint256)",

  /* ========== ADMIN / CONFIG ========== */
  "function owner() external view returns (address)",
  "function setGiftContract(address _giftContract) external",
  "function giftContract() external view returns (address)"
] as const;