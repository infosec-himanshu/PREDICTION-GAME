"use client";

import { BrowserProvider, Contract } from "ethers";
import PredictionArena from "@/lib/abi/PredictionStake.json";

export const PREDICTION_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_DUNGEON_CONTRACT_ADDRESS!;

export async function getPredictionContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  const provider = new BrowserProvider(window.ethereum);

  // 🔴 THIS LINE WAS MISSING
  await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner();

  return new Contract(
    PREDICTION_CONTRACT_ADDRESS,
    PredictionArena.abi,
    signer
  );
}
