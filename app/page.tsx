"use client";

import Link from "next/link";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function Home() {
  const games = [
    {
      id: "loot",
      title: "Loot Rarity Prediction",
      description:
        "Predict the rarity of treasure you discover. Use GPS to find hidden loot and stake your prediction on its rarity level.",
      href: "/loot",
      icon: "💎",
    },
    {
      id: "dungeon",
      title: "Dungeon Fight Prediction",
      description:
        "Battle against AI-powered dungeon masters. Stake on yourself or the AI, and watch the epic turn-based combat unfold.",
      href: "/dungeon",
      icon: "⚔️",
    },
    {
      id: "market",
      title: "Market Direction Prediction",
      description:
        "Predict crypto market movements with AI assistance. Get probability hints, then make your own prediction on price direction.",
      href: "/market",
      icon: "📈",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-[0_0_18px_rgba(255,200,120,0.35)]">
          On-Chain Prediction Arena
        </h1>

        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8">
          A multi-game on-chain prediction platform powered by Monad and AI
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <span className="px-4 py-2 bg-black/40 border border-[#f5c66a] rounded-lg text-sm text-white">
            🎮 Web3 Gaming
          </span>
          <span className="px-4 py-2 bg-black/40 border border-[#f5c66a] rounded-lg text-sm text-white">
            🤖 AI-Powered
          </span>
          <span className="px-4 py-2 bg-black/40 border border-[#f5c66a] rounded-lg text-sm text-white">
            ⛓️ On-Chain
          </span>
        </div>
      </section>

      {/* Game Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {games.map((game) => (
          <Link key={game.id} href={game.href}>
            <Card hover>
              <div className="text-6xl mb-4 text-center text-white">
                {game.icon}
              </div>

              <h2 className="text-2xl font-bold mb-4 text-center text-white">
                {game.title}
              </h2>

              <p className="text-white/80 mb-6 text-center min-h-[80px]">
                {game.description}
              </p>

              <div className="flex justify-center">
                <Button
                  variant="primary"
                  className="
                    w-full
                    text-black
                    font-semibold
                    bg-[#f5c66a]
                    hover:bg-[#f5c66a]
                    shadow-[0_0_20px_rgba(245,198,106,0.6)]
                    border border-[#f3d08a]
                  "
                >
                  Play Now
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}