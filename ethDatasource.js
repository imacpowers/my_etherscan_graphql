const { RESTDataSource } = require("apollo-datasource-rest");

// Vitalik's Ethereum Address 
// Hardcoded ethereum address used for querying account balance
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; 

// Etherscan Data Source Class
// Extends RESTDataSource to make calls to Etherscan API
class EtherDataSource extends RESTDataSource {

 constructor() {
   super();
   this.baseURL = "https://api.etherscan.io/api";
 }

 async etherBalanceByAddress() {
   // Fetches account balance for the hardcoded eth_address
   return this.get(
     `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
   );
 }

 async totalSupplyOfEther() {
   // Fetches total ether supply
   return this.get(
     `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
   );
 }

 // Paste Code Here For New API Endpoints
 
 async getLatestEthereumPrice() {
   // Fetches latest ETH price
   return this.get(
     `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
   );
 }

 async getBlockConfirmationTime() {
   // Estimates block confirmation time based on a sample gas price
   return this.get(
     `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
   );
 }
}

module.exports = EtherDataSource;
