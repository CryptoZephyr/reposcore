"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import {
  isMetaMaskInstalled,
  connectMetaMask,
  switchAccount,
  getAccounts,
  getCurrentChainId,
  isOnGenLayerNetwork,
  getEthereumProvider,
  GENLAYER_CHAIN_ID,
} from "./client";
import { error, userRejected } from "../utils/toast";

// localStorage key for tracking auditor's disconnect intent
const DISCONNECT_FLAG = "reposcore_wallet_disconnected";

export interface WalletState {
  address: string | null;
  chainId: string | null;
  isConnected: boolean;
  isLoading: boolean;
  isMetaMaskInstalled: boolean;
  isOnCorrectNetwork: boolean;
}

interface WalletContextValue extends WalletState {
  connectWallet: () => Promise<string>;
  disconnectWallet: () => void;
  switchWalletAccount: () => Promise<string>;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

/**
 * WalletProvider for RepoScore
 * Manages the connection state of the auditor performing GitHub evaluations.
 */
export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState>({
    address: null,
    chainId: null,
    isConnected: false,
    isLoading: true,
    isMetaMaskInstalled: false,
    isOnCorrectNetwork: false,
  });

  // Initialize wallet state on mount
  useEffect(() => {
    const initWallet = async () => {
      const installed = isMetaMaskInstalled();

      if (!installed) {
        setState((s) => ({ ...s, isLoading: false, isMetaMaskInstalled: false }));
        return;
      }

      if (typeof window !== "undefined") {
        const wasDisconnected = localStorage.getItem(DISCONNECT_FLAG) === "true";
        if (wasDisconnected) {
          setState((s) => ({ ...s, isLoading: false, isMetaMaskInstalled: true }));
          return;
        }
      }

      try {
        const accounts = await getAccounts();
        const chainId = await getCurrentChainId();
        const correctNetwork = await isOnGenLayerNetwork();

        setState({
          address: accounts[0] || null,
          chainId,
          isConnected: accounts.length > 0,
          isLoading: false,
          isMetaMaskInstalled: true,
          isOnCorrectNetwork: correctNetwork,
        });
      } catch (err) {
        console.error("RepoScore Wallet Init Error:", err);
        setState((s) => ({ ...s, isLoading: false, isMetaMaskInstalled: true }));
      }
    };

    initWallet();
  }, []);

  // Handle MetaMask Events
  useEffect(() => {
    const provider = getEthereumProvider();
    if (!provider) return;

    const handleAccountsChanged = async (accounts: string[]) => {
      const chainId = await getCurrentChainId();
      const correctNetwork = await isOnGenLayerNetwork();
      if (accounts.length > 0) localStorage.removeItem(DISCONNECT_FLAG);

      setState((prev) => ({
        ...prev,
        address: accounts[0] || null,
        chainId,
        isConnected: accounts.length > 0,
        isOnCorrectNetwork: correctNetwork,
      }));
    };

    const handleChainChanged = async (chainId: string) => {
      const correctNetwork = parseInt(chainId, 16) === GENLAYER_CHAIN_ID;
      const accounts = await getAccounts();
      setState((prev) => ({
        ...prev,
        chainId,
        address: accounts[0] || null,
        isConnected: accounts.length > 0,
        isOnCorrectNetwork: correctNetwork,
      }));
    };

    provider.on("accountsChanged", handleAccountsChanged);
    provider.on("chainChanged", handleChainChanged);

    return () => {
      provider.removeListener("accountsChanged", handleAccountsChanged);
      provider.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const address = await connectMetaMask();
      const chainId = await getCurrentChainId();
      const correctNetwork = await isOnGenLayerNetwork();

      localStorage.removeItem(DISCONNECT_FLAG);

      setState({
        address,
        chainId,
        isConnected: true,
        isLoading: false,
        isMetaMaskInstalled: true,
        isOnCorrectNetwork: correctNetwork,
      });

      return address;
    } catch (err: any) {
      setState((prev) => ({ ...prev, isLoading: false }));
      if (err.message?.includes("rejected")) {
        userRejected("Auditor connection cancelled");
      } else if (err.message?.includes("MetaMask is not installed")) {
        error("MetaMask Not Found", {
          description: "Please install MetaMask to evaluate GitHub profiles."
        });
      } else {
        error("Connection Failed", { description: err.message });
      }
      throw err;
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    localStorage.setItem(DISCONNECT_FLAG, "true");
    setState((prev) => ({ ...prev, address: null, isConnected: false }));
  }, []);

  const switchWalletAccount = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const newAddress = await switchAccount();
      const chainId = await getCurrentChainId();
      const correctNetwork = await isOnGenLayerNetwork();

      localStorage.removeItem(DISCONNECT_FLAG);

      setState({
        address: newAddress,
        chainId,
        isConnected: true,
        isLoading: false,
        isMetaMaskInstalled: true,
        isOnCorrectNetwork: correctNetwork,
      });

      return newAddress;
    } catch (err: any) {
      setState((prev) => ({ ...prev, isLoading: false }));
      if (!err.message?.includes("rejected")) {
        error("Switch Failed", { description: err.message });
      }
      throw err;
    }
  }, []);

  return (
    <WalletContext.Provider value={{ ...state, connectWallet, disconnectWallet, switchWalletAccount }}>
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