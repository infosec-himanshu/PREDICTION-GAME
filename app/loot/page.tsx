"use client";

import { useState } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { playLoot, LootChoice } from "@/hooks/useLootContract";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

enum LootPredictionType {
  Common = 0,
  Rare = 1,
  Epic = 2,
  Harmful = 3,
}
const GAME_ID = 1001; // fixed loot game id

const PREDICTION_TYPES = [
  { value: LootPredictionType.Common, label: "Common", icon: "⚪" },
  { value: LootPredictionType.Rare, label: "Rare", icon: "🔵" },
  { value: LootPredictionType.Epic, label: "Epic", icon: "🟣" },
  { value: LootPredictionType.Harmful, label: "Harmful", icon: "🔴" },
];

export default function LootPage() {
  const { isConnected } = useWallet();

  const [selectedPrediction, setSelectedPrediction] =
    useState<LootPredictionType | null>(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const [treasureOpened, setTreasureOpened] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<{ won: boolean; result: LootPredictionType } | null>(null);

  const handleSubmitPrediction = async () => {
    if (!isConnected) return alert("Connect wallet");
    if (selectedPrediction === null) return alert("Select prediction");
    if (!stakeAmount) return alert("Enter stake");

    setLoading(true);
    try {
      await playLoot(
  selectedPrediction as unknown as LootChoice,
  stakeAmount
);


      setTreasureOpened(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenTreasure = async () => {
  // UI-only logic (contract already decided outcome)
  const actual = LootPredictionType.Rare; // FIXED RESULT
  const won = actual === selectedPrediction;

  setResult({ won, result: actual });
  setShowResult(true);
};


  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Loot Rarity Prediction
      </h1>

      {/* SELECT */}
      <Card className="mb-6">
        <h3 className="text-xl font-bold mb-4">Select Prediction</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PREDICTION_TYPES.map((p) => (
            <button
              key={p.value}
              onClick={() => setSelectedPrediction(p.value)}
              className={`p-4 rounded-lg border ${
                selectedPrediction === p.value
                  ? "border-neon-cyan"
                  : "border-gray-700"
              }`}
            >
              <div className="text-3xl mb-2">{p.icon}</div>
              <div>{p.label}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* STAKE */}
      <Card className="mb-6">
        <h3 className="text-xl font-bold mb-4">Stake Amount (MON)</h3>
        <input
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          className="w-full p-3 rounded bg-black border border-gray-700"
        />
      </Card>

      {!treasureOpened ? (
        <Button
          className="w-full"
          isLoading={loading}
          onClick={handleSubmitPrediction}
        >
          Submit Prediction
        </Button>
      ) : (
        <Button
          className="w-full"
          isLoading={loading}
          onClick={handleOpenTreasure}
        >
          Open Treasure 💎
        </Button>
      )}

      {/* RESULT */}
      <Modal
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        title="Treasure Result"
      >
        {result && (
          <div className="text-center">
            <div className="text-5xl mb-4">
              {PREDICTION_TYPES[result.result].icon}
            </div>
            <p className="text-xl mb-2">
              Loot was: {PREDICTION_TYPES[result.result].label}
            </p>
            <p className={result.won ? "text-green-400" : "text-red-400"}>
              {result.won ? "🎉 You Won!" : "❌ You Lost"}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
