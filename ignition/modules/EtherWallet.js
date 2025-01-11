// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("EtherWalletModule", (m) => {
  const etherWallet = m.contract("EtherWallet");
console.log('Deployed to ', etherWallet);
//0x5FbDB2315678afecb367f032d93F642f64180aa3
  return { etherWallet };
});
