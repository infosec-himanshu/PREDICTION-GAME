import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { asset, timeframe } = await request.json();

    // Mock AI prediction logic
    // In production, this would call an actual AI service
    const baseProbability = 50;
    const assetVariation = asset === "BTC" ? 5 : -5;
    const timeframeVariation = timeframe === 5 ? 10 : timeframe === 15 ? 5 : 0;
    const randomVariation = Math.floor(Math.random() * 20) - 10;

    const probability = Math.max(
      30,
      Math.min(70, baseProbability + assetVariation + timeframeVariation + randomVariation)
    );

    return NextResponse.json({ probability });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get AI prediction" },
      { status: 500 }
    );
  }
}

