"use client";

import { parseEther } from "ethers";
import { getPredictionContract } from "@/lib/contracts";

export enum LootChoice {
  COMMON = 0,
  RARE = 1,
  EPIC = 2,
  HARMFUL = 3,
}

export async function playLoot(
  choice: LootChoice,
  amount: string
) {
  if (!amount || Number(amount) <= 0) {
    throw new Error("Invalid stake amount");
  }

  const contract = await getPredictionContract();

  const value = parseEther(amount);

  // Debug check (optional)
  console.log("Loot stake value:", value.toString());

  const tx = await contract.playLootGame(choice, {
    value,
  });

  return await tx.wait();
}
