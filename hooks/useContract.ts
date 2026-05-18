"use client";

const PredictionStakeABI = require("@/lib/abi/PredictionStake.json");
import { BrowserProvider, Contract } from "ethers";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_DUNGEON_CONTRACT_ADDRESS!;

export async function getPredictionArenaContract() {
  if (!window.ethereum) throw new Error("MetaMask not found");

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new Contract(
    CONTRACT_ADDRESS,
    PredictionStakeABI,
    signer
  );
}