const { ethers } = require("hardhat");

async function main() {
  const [signer] = await ethers.getSigners();

  const address = "0x484120E56f90070cAF2308a477a99917e0ED7F9b";

  const abi = [
    "function playDungeonGame(uint8 side) payable"
  ];

  const contract = new ethers.Contract(address, abi, signer);

  const tx = await contract.playDungeonGame(0, {
    value: ethers.utils.parseEther("0.01"),
  });

  console.log("TX sent:", tx.hash);
  await tx.wait();
  console.log("TX mined");
}

main().catch(console.error);
