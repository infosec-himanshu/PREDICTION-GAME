"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@/contexts/WalletContext";import { playDungeon, FightSide } from "@/hooks/useDungeonContract";
import { ethers } from "ethers";
import Card from "@/components/Card";
import Button from "@/components/Button";
interface BattleState {
  playerHP: number;
  aiHP: number;
  totalPool: string;
  turn: "player" | "ai";
  battleActive: boolean;
}



export default function DungeonPage() {
  const { isConnected, address } = useWallet();
  const [battleId] = useState(1);
  const [battleState, setBattleState] = useState<BattleState>({
    playerHP: 100,
    aiHP: 100,
    totalPool: "0",
    turn: "player",
    battleActive: true,
  });
  const [stakeAmount, setStakeAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);

  useEffect(() => {
    // Mock initial stakes
    loadStakes();
    const interval = setInterval(loadStakes, 5000);
    return () => clearInterval(interval);
  }, []);

const GAME_ID = 1;

const loadStakes = async () => {
  // backend logic removed in new contract
  // keeping UI alive
  setBattleState((prev) => ({
    ...prev,
    totalPool: prev.totalPool,
  }));
};

const handleStakeForPlayer = async () => {
  if (!isConnected) return alert("Connect wallet");
  if (!stakeAmount) return alert("Enter amount");

  setIsLoading(true);
  try {
    await playDungeon(FightSide.PLAYER, stakeAmount);
    setStakeAmount("");
    await loadStakes();
  } finally {
    setIsLoading(false);
  }
};

const handleStakeForAI = async () => {
  if (!isConnected) return alert("Connect wallet");
  if (!stakeAmount) return alert("Enter amount");

  setIsLoading(true);
  try {
    await playDungeon(FightSide.AI, stakeAmount);
    setStakeAmount("");
    await loadStakes();
  } finally {
    setIsLoading(false);
  }
};



  const handlePlayerAction = async (action: "attack" | "defend" | "heal") => {
    if (battleState.turn !== "player" || !battleState.battleActive) return;

    setAiThinking(true);

    // Player action
    let newPlayerHP = battleState.playerHP;
    let newAIHP = battleState.aiHP;

    if (action === "attack") {
      const damage = Math.floor(Math.random() * 20) + 10;
      newAIHP = Math.max(0, battleState.aiHP - damage);
    } else if (action === "heal") {
      newPlayerHP = Math.min(100, battleState.playerHP + 15);
    }

    // AI turn (mocked)
    setTimeout(() => {
      const aiAction = Math.random() > 0.5 ? "attack" : "heal";
      if (aiAction === "attack") {
        const damage = Math.floor(Math.random() * 18) + 8;
        newPlayerHP = Math.max(0, newPlayerHP - damage);
      } else {
        newAIHP = Math.min(100, newAIHP + 12);
      }

      setBattleState({
        playerHP: newPlayerHP,
        aiHP: newAIHP,
        totalPool: battleState.totalPool,
        turn: "player",
        battleActive: newPlayerHP > 0 && newAIHP > 0,
      });
      setAiThinking(false);
    }, 1500);
  };

  const formatStakes = (stakes: string) => {
    try {
      const num = parseFloat(stakes);
      return isNaN(num) ? "0.00" : num.toFixed(2);
    } catch {
      return "0.00";
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-gradient">
        Dungeon Fight Prediction
      </h1>

      <div className="mb-6 text-center">
        <div className="inline-block px-4 py-2 bg-dark-card border border-neon-purple rounded-lg">
          <span className="text-sm text-gray-400">AI-powered </span>
          <span className="font-bold text-neon-purple">Dungeon Master</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Player Side */}
        <Card>
          <h3 className="text-xl font-bold mb-4 text-center">Player</h3>
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">⚔️</div>
            <div className="text-3xl font-bold text-neon-green mb-2">
              {battleState.playerHP} HP
            </div>
            <div className="w-full bg-dark-bg rounded-full h-4 mb-4">
              <div
                className="bg-neon-green h-4 rounded-full transition-all duration-500"
                style={{ width: `${battleState.playerHP}%` }}
              />
            </div>
            <div className="text-sm text-gray-400">
              Total Stakes: <span className="text-neon-green font-bold">{formatStakes(battleState.totalPool)} MON</span>
            </div>
          </div>
        </Card>

        {/* Battle Arena */}
        <Card>
          <h3 className="text-xl font-bold mb-4 text-center">Battle Arena</h3>
          <div className="text-center py-8">
            {battleState.battleActive ? (
              <>
                {battleState.turn === "player" && !aiThinking ? (
                  <div className="space-y-3">
                    <p className="text-gray-400 mb-4">Your Turn</p>
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => handlePlayerAction("attack")}
                        variant="danger"
                        size="sm"
                      >
                        ⚔️ Attack
                      </Button>
                      <Button
                        onClick={() => handlePlayerAction("defend")}
                        variant="outline"
                        size="sm"
                      >
                        🛡️ Defend
                      </Button>
                      <Button
                        onClick={() => handlePlayerAction("heal")}
                        variant="primary"
                        size="sm"
                      >
                        ❤️ Heal
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl mb-2 animate-pulse">🤖</div>
                    <p className="text-gray-400">AI is thinking...</p>
                  </div>
                )}
              </>
            ) : (
              <div>
                <div className="text-4xl mb-2">
                  {battleState.playerHP > 0 ? "🎉" : "💀"}
                </div>
                <p className="text-xl font-bold">
                  {battleState.playerHP > 0 ? "Player Wins!" : "AI Wins!"}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* AI Side */}
        <Card>
          <h3 className="text-xl font-bold mb-4 text-center">Dungeon AI</h3>
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">🤖</div>
            <div className="text-3xl font-bold text-neon-purple mb-2">
              {battleState.aiHP} HP
            </div>
            <div className="w-full bg-dark-bg rounded-full h-4 mb-4">
              <div
                className="bg-neon-purple h-4 rounded-full transition-all duration-500"
                style={{ width: `${battleState.aiHP}%` }}
              />
            </div>
            <div className="text-sm text-gray-400">
              Total Stakes: <span className="text-neon-purple font-bold">{formatStakes(battleState.totalPool)} MON </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Staking Section */}
      <Card>
        <h3 className="text-xl font-bold mb-4">Place Your Stake</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
          <div className="flex gap-4 items-end">
            <Button
              onClick={handleStakeForPlayer}
              isLoading={isLoading}
              disabled={!stakeAmount}
              variant="primary"
              className="flex-1"
            >
              Stake for Player
            </Button>
            <Button
              onClick={handleStakeForAI}
              isLoading={isLoading}
              disabled={!stakeAmount}
              variant="outline"
              className="flex-1"
            >
              Stake for AI
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

