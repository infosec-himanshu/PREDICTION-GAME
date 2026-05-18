"use client";

import { parseEther } from "ethers";
import { getPredictionContract } from "@/lib/contracts";

export enum FightSide {
  PLAYER = 0,
  AI = 1,
}

export async function playDungeon(
  side: FightSide,
  amount: string
) {
  if (!amount || Number(amount) <= 0) {
    throw new Error("Invalid stake amount");
  }

  const contract = await getPredictionContract();

  const value = parseEther(amount);

  // Debug check (optional)
  console.log("Dungeon stake value:", value.toString());

  const tx = await contract.playDungeonGame(side, {
    value,
  });

  return await tx.wait();
}
const testTx = async () => {
  const contract = await getPredictionContract();
  await contract.playDungeonGame(0, {
    value: parseEther("0.01"),
  });
};
