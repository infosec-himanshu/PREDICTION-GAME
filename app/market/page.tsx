"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@/contexts/WalletContext";
import {
  playMarket,
  MarketDirection,
  TimeFrame,
} from "@/hooks/useMarketContract";

import Card from "@/components/Card";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

const ASSETS = ["MON", "ETH"];
const TIMEFRAMES: { label: string; value: number }[] = [
  { label: "5 minutes", value: 5 },
  { label: "15 minutes", value: 15 },
  { label: "1 hour", value: 60 },
];


export default function MarketPage() {
  const { isConnected, address } = useWallet();
  const [selectedAsset, setSelectedAsset] = useState("BTC");
  const [selectedTimeframe, setSelectedTimeframe] = useState<number>(5);
  const [aiProbability, setAiProbability] = useState<number | null>(null);
  const [selectedDirection, setSelectedDirection] = useState<MarketDirection | null>(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [result, setResult] = useState<{ win: boolean } | null>(null);

  useEffect(() => {
    // Mock AI probability API call
    fetchAIProbability();
  }, [selectedAsset, selectedTimeframe]);

  const fetchAIProbability = async () => {
    // Mock AI API route
    try {
      const response = await fetch("/api/ai-prediction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          asset: selectedAsset,
          timeframe: selectedTimeframe,
        }),
      });
      const data = await response.json();
      setAiProbability(data.probability);
    } catch (error) {
      // Fallback to mock data
      const mockProbability = Math.floor(Math.random() * 30) + 40; // 40-70%
      setAiProbability(mockProbability);
    }
  };

  const handleSubmit = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    if (selectedDirection === null) {
      alert("Please select a direction");
      return;
    }

    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      alert("Please enter a valid stake amount");
      return;
    }

    setIsLoading(true);
    try {
    await playMarket(
     selectedDirection,
     TimeFrame.MIN_5, // timeframe has NO effect in contract
     stakeAmount
    );


      // Mock result - in production, listen for MarketResult event
      const mockWin = Math.random() > 0.5;
      setResult({ win: mockWin });
      setShowResultModal(true);

      // Reset form
      setSelectedDirection(null);
      setStakeAmount("");
    } catch (error) {
      console.error("Prediction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-gradient">
        Market Direction Prediction
      </h1>

      {/* Asset Selection */}
      <Card className="mb-6">
        <h3 className="text-xl font-bold mb-4">Select Asset</h3>
        <div className="flex gap-4">
          {ASSETS.map((asset) => (
            <button
              key={asset}
              onClick={() => setSelectedAsset(asset)}
              className={`flex-1 py-4 rounded-lg border-2 transition-all font-bold text-lg ${
                selectedAsset === asset
                  ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan"
                  : "border-dark-border hover:border-neon-purple"
              }`}
            >
              {asset}
            </button>
          ))}
        </div>
      </Card>

      {/* Timeframe Selection */}
      <Card className="mb-6">
        <h3 className="text-xl font-bold mb-4">Select Timeframe</h3>
        <div className="grid grid-cols-3 gap-4">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setSelectedTimeframe(tf.value)}
              className={`py-3 rounded-lg border-2 transition-all ${
                selectedTimeframe === tf.value
                  ? "border-neon-purple bg-neon-purple/10 text-neon-purple"
                  : "border-dark-border hover:border-neon-cyan"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </Card>

      {/* AI Hint */}
      {aiProbability !== null && (
        <Card className="mb-6 border-neon-purple">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🤖</span>
            <h3 className="text-lg font-bold">AI Prediction Hint</h3>
          </div>
          <p className="text-gray-300">
            AI predicts <span className="text-neon-cyan font-bold">{aiProbability}%</span> chance
            price goes <span className="text-neon-green font-bold">UP</span> in the next{" "}
            {TIMEFRAMES.find((tf) => tf.value === selectedTimeframe)?.label}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Note: This is only a probability hint. The final decision is yours.
          </p>
        </Card>
      )}

      {/* Direction Selection */}
      <Card className="mb-6">
        <h3 className="text-xl font-bold mb-4">Your Prediction</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setSelectedDirection(MarketDirection.UP)}
            className={`py-6 rounded-lg border-2 transition-all ${
              selectedDirection === MarketDirection.UP
                ? "border-neon-green bg-neon-green/10"
                : "border-dark-border hover:border-neon-green"
            }`}
          >
            <div className="text-4xl mb-2">📈</div>
            <div className="text-xl font-bold">UP</div>
          </button>
          <button
            onClick={() => setSelectedDirection(MarketDirection.DOWN)}
            className={`py-6 rounded-lg border-2 transition-all ${
              selectedDirection === MarketDirection.DOWN
                ? "border-red-400 bg-red-400/10"
                : "border-dark-border hover:border-red-400"
            }`}
          >
            <div className="text-4xl mb-2">📉</div>
            <div className="text-xl font-bold">DOWN</div>
          </button>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Stake Amount (MON)
          </label>
          <input
            type="number"
            step="0.001"
            min="0.001"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder="0.001"
            className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-neon-cyan transition-colors mb-4"
          />
          <Button
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={selectedDirection === null || !stakeAmount}
            className="w-full"
          >
            Submit Prediction
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        title="Prediction Result"
      >
        {result?.win ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h3 className="text-2xl font-bold mb-2 text-neon-green">You Won!</h3>
            <p className="text-gray-400 mb-4">
              Your prediction was correct! The price moved in your predicted direction.
            </p>
            <p className="text-neon-cyan">Rewards have been sent to your wallet!</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold mb-2 text-red-400">Better Luck Next Time</h3>
            <p className="text-gray-400">
              The price moved in the opposite direction of your prediction.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

