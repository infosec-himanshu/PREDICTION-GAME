"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

interface WalletContextType {
  address: string | null;
  balance: string;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  checkNetwork: () => Promise<boolean>;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);
const MONAD_CHAIN_ID = 10143;



export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

 const checkNetwork = useCallback(async (): Promise<boolean> => {
  if (!window.ethereum) {
    toast.error("MetaMask not detected");
    return false;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const network = await provider.getNetwork();

  const currentChainId = Number(network.chainId);

  if (currentChainId !== MONAD_CHAIN_ID) {
    toast.error(`Please switch to Monad network (Chain ID: ${MONAD_CHAIN_ID})`);
    return false;
  }

  return true;
}, []);

 

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      const isCorrectNetwork = await checkNetwork();
      if (!isCorrectNetwork) {
        return;
      }

      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.formatEther(balance);

      setProvider(provider);
      setSigner(signer);
      setAddress(address);
      setBalance(formattedBalance);

      toast.success("Wallet connected!");
    } catch (error: any) {
      console.error("Connection error:", error);
      toast.error(error.message || "Failed to connect wallet");
    }
  }, [checkNetwork]);

  const disconnectWallet = useCallback(() => {
    setAddress(null);
    setBalance("0");
    setProvider(null);
    setSigner(null);
    toast.success("Wallet disconnected");
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          connectWallet();
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      provider.getSigner()
        .then(async (signer) => {
          try {
            const address = await signer.getAddress();
            const balance = await provider.getBalance(address);
            setProvider(provider);
            setSigner(signer);
            setAddress(address);
            setBalance(ethers.formatEther(balance));
          } catch {
            // User not connected
          }
        })
        .catch(() => {
          // User not connected
        });
    }
  }, [connectWallet, disconnectWallet]);

  useEffect(() => {
    if (address && provider) {
      const interval = setInterval(async () => {
        try {
          const balance = await provider.getBalance(address);
          setBalance(ethers.formatEther(balance));
        } catch (error) {
          console.error("Balance update error:", error);
        }
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [address, provider]);

  return (
    <WalletContext.Provider
      value={{
        address,
        balance,
        isConnected: !!address,
        connectWallet,
        disconnectWallet,
        checkNetwork,
        provider,
        signer,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

