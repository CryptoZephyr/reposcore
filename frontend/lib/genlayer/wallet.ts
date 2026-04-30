"use client";

/**
 * Re-export wallet functionality from WalletProvider
 * Used by RepoScore to manage the auditor's connection state.
 */
export { useWallet, WalletProvider } from "./WalletProvider";
export type { WalletState } from "./WalletProvider";

/**
 * Utility function to format blockchain addresses for display.
 * In RepoScore, this is used for displaying the auditor's identity
 * in the Account Panel and evaluation history.
 * 
 * @param address - The address to format
 * @param maxLength - Maximum length before truncation (default: 12)
 */
export function formatAddress(
  address: string | null,
  maxLength: number = 12
): string {
  if (!address) return "";
  if (address.length <= maxLength) return address;

  const prefixLength = Math.floor((maxLength - 3) / 2);
  const suffixLength = Math.ceil((maxLength - 3) / 2);

  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
}