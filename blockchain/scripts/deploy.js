const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with:", deployer.address);

  const PredictionArena = await ethers.getContractFactory("PredictionArena");

  const contract = await PredictionArena.deploy(
    deployer.address // storageWallet
  );

  await contract.deployed();

  console.log("PredictionArena deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
