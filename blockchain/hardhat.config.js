require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",
  networks: {
    monad: {
      url: "https://testnet-rpc.monad.xyz",
      accounts: ["3c5c6e371296d80cf84443709440731444a5f21bd108fff58dd4805dbfeaa384"]
    }
  }
};
