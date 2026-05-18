"use client";

import { parseEther } from "ethers";
import { getPredictionContract } from "@/lib/contracts";

export enum MarketDirection {
  UP = 0,
  DOWN = 1,
}

export enum TimeFrame {
  MIN_5 = 0,
  MIN_15 = 1,
  MIN_60 = 2,
}

export async function playMarket(
  direction: MarketDirection,
  timeframe: TimeFrame,
  amount: string
) {
  if (!amount || Number(amount) <= 0) {
    throw new Error("Invalid stake amount");
  }

  const contract = await getPredictionContract();

  const value = parseEther(amount);

  // Debug check (optional)
  console.log("Market stake value:", value.toString());

  const tx = await contract.playMarketGame(direction, timeframe, {
    value,
  });

  return await tx.wait();
}
