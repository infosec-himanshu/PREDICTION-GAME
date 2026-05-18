"use client";

import Link from "next/link";
import { useWallet } from "@/contexts/WalletContext";
import Button from "./Button";

export default function Header() {
  const { address, balance, isConnected, connectWallet, disconnectWallet } =
    useWallet();

  const formatAddress = (addr: string | null) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="border-b border-dark-border bg-dark-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Website Name */}
          <Link
            href="/"
            className="
              text-2xl font-bold
              bg-gradient-to-r from-[#f5c66a] via-[#e6a93d] to-[#c88a1e]
              bg-clip-text text-transparent
              drop-shadow-[0_0_12px_rgba(255,190,90,0.6)]
            "
          >
            MONey 41
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-white">
            <Link href="/" className="hover:text-[#f5c66a] transition-colors">
              Home
            </Link>
            <Link href="/loot" className="hover:text-[#f5c66a] transition-colors">
              Loot
            </Link>
            <Link href="/dungeon" className="hover:text-[#f5c66a] transition-colors">
              Dungeon
            </Link>
            <Link href="/market" className="hover:text-[#f5c66a] transition-colors">
              Market
            </Link>
          </nav>

          {/* Wallet Section */}
          <div className="flex items-center gap-4">
            {isConnected ? (
              <>
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm text-gray-400">
                    {formatAddress(address)}
                  </span>
                  <span className="text-xs text-[#7CFF7A]">
                    {parseFloat(balance).toFixed(4)} MON
                  </span>
                </div>
                <Button onClick={disconnectWallet} variant="outline" size="sm">
                  Disconnect
                </Button>
              </>
            ) : (
              <Button onClick={connectWallet} size="sm">
                Connect Wallet
              </Button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}