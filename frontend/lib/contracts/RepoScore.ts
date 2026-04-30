import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";

export interface ScoreRecord {
  username: string;
  contribution_score: number;
  consistency: 'low' | 'medium' | 'high';
  top_languages: string[];
  community_impact: number;
  trust_score: number;
  verdict: string;
}

class RepoScore {
  private contractAddress: `0x${string}`;
  private client: ReturnType<typeof createClient>;

  constructor(
    contractAddress: string,
    address?: string | null,
    studioUrl?: string
  ) {
    this.contractAddress = contractAddress as `0x${string}`;
    const config: any = { chain: studionet };
    if (address) config.account = address as `0x${string}`;
    if (studioUrl) config.endpoint = studioUrl;
    this.client = createClient(config);
  }

  async get_all_scores(): Promise<Record<string, ScoreRecord>> {
    try {
      const scores: any = await this.client.readContract({
        address: this.contractAddress,
        functionName: "get_all_scores",
        args: [],
        stateStatus: 'accepted'
      } as any);

      if (scores instanceof Map) {
        const result: Record<string, ScoreRecord> = {};
        scores.forEach((value: any, key: string) => {
          result[key] = value instanceof Map ? Object.fromEntries(value) as ScoreRecord : value;
        });
        return result;
      }
      return scores || {};
    } catch (error) {
      console.error("Error fetching all scores:", error);
      throw new Error("Failed to fetch audit records from GenLayer");
    }
  }

  async get_score(username: string): Promise<ScoreRecord | { error: string }> {
    try {
      const result: any = await this.client.readContract({
        address: this.contractAddress,
        functionName: "get_score",
        args: [username],
        stateStatus: 'finalized'
      } as any);
      return result;
    } catch (error) {
      console.error(`Error fetching score for ${username}:`, error);
      throw new Error("User evaluation not found");
    }
  }

  async evaluate_user(username: string): Promise<ScoreRecord> {
    try {
      console.log(`🚀 Starting audit for @${username}...`);

      const txHash = await this.client.writeContract({
        address: this.contractAddress,
        functionName: "evaluate_user",
        args: [username],
        value: BigInt(0),
      });

      console.log(`⏳ Transaction submitted. Hash: ${txHash}. Waiting for LLM consensus...`);

      const receipt = await this.client.waitForTransactionReceipt({
        hash: txHash,
        status: "FINALIZED" as any,
        retries: 100,
        interval: 8000,
      });

      console.log("✅ Transaction Accepted. Waiting for state indexing...");

      if (receipt && (receipt as any).output) {
        return (receipt as any).output as ScoreRecord;
      }

      for (let i = 0; i < 10; i++) {
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const fallback = await this.get_score(username);
        console.log(`Attempt ${i + 1}: Checking storage...`, fallback);

        let fallbackObj: any = fallback instanceof Map ? Object.fromEntries(fallback) : fallback;

        // handle nested Map values
        if (fallbackObj && typeof fallbackObj === 'object') {
          for (const key of Object.keys(fallbackObj)) {
            if (fallbackObj[key] instanceof Map) {
              fallbackObj[key] = Object.fromEntries(fallbackObj[key]);
            }
          }
        }

        if (fallbackObj && 'username' in fallbackObj && !('error' in fallbackObj)) {
          console.log("🎉 Score found in storage!", fallbackObj);
          return fallbackObj as ScoreRecord;
        }
      }

      throw new Error("The audit was recorded, but the node is very slow to index. Please wait 30 seconds and refresh the page.");

    } catch (error: any) {
      console.error("Audit Transaction Error:", error);
      throw new Error(error.message || "Failed to complete technical audit");
    }
  }
}

export default RepoScore;