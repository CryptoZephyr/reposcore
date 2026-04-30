"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import RepoScore from "../contracts/RepoScore";
import { getContractAddress, getStudioUrl } from "../genlayer/client";
import { useWallet } from "../genlayer/wallet";
import { success, error, configError } from "../utils/toast";

export function useRepoScoreContract(): RepoScore | null {
  const { address } = useWallet();
  const contractAddress = getContractAddress();
  const studioUrl = getStudioUrl();

  const contract = useMemo(() => {
    if (!contractAddress) {
      configError(
        "Configuration Missing",
        "Contract address not found. Please set NEXT_PUBLIC_CONTRACT_ADDRESS in your .env file."
      );
      return null;
    }
    return new RepoScore(contractAddress, address, studioUrl);
  }, [contractAddress, address, studioUrl]);

  return contract;
}

export function useEvaluations() {
  const contract = useRepoScoreContract();

  return useQuery<Record<string, any>, Error>({
    queryKey: ["evaluations"],
    queryFn: async () => {
      if (!contract) return {};
      return await contract.get_all_scores();
    },
    refetchOnWindowFocus: true,
    staleTime: 5000,
    enabled: !!contract,
  });
}

export function useUserScore(username: string | null) {
  const contract = useRepoScoreContract();

  return useQuery({
    queryKey: ["userScore", username],
    queryFn: async () => {
      if (!contract || !username) return null;
      return await contract.get_score(username);
    },
    enabled: !!username && !!contract,
    staleTime: 10000,
  });
}

export function useEvaluateUser() {
  const contract = useRepoScoreContract();
  const { address } = useWallet();
  const queryClient = useQueryClient();
  const [isEvaluating, setIsEvaluating] = useState(false);

  const mutation = useMutation({
    mutationFn: async (username: string) => {
      if (!contract) throw new Error("Contract not configured.");
      if (!address) throw new Error("Wallet not connected.");
      setIsEvaluating(true);
      return await contract.evaluate_user(username);
    },
    onSuccess: async (data) => {
      // FIX: Wait 2 seconds for the node to update its readable state
      await new Promise((resolve) => setTimeout(resolve, 2000));

      queryClient.invalidateQueries({ queryKey: ["evaluations"] });
      if (data?.username) {
        queryClient.invalidateQueries({ queryKey: ["userScore", data.username] });
      }

      setIsEvaluating(false);
      success("Audit Complete!", {
        description: `Successfully evaluated @${data?.username || 'the developer'} on-chain.`
      });
    },
    onError: (err: any) => {
      console.error("Audit error:", err);
      setIsEvaluating(false);
      error("Audit Failed", {
        description: err?.message || "GenLayer nodes could not reach consensus."
      });
    },
  });

  return {
    ...mutation,
    isEvaluating,
    evaluateUser: mutation.mutate,
    evaluateUserAsync: mutation.mutateAsync,
  };
}