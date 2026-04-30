/**
 * TypeScript types for RepoScore
 * Based on the ScoreRecord intelligent contract structure
 */

export interface ScoreRecord {
  username: string;
  contribution_score: number;
  consistency: "low" | "medium" | "high";
  top_languages: string[];
  community_impact: number;
  trust_score: number;
  verdict: string;
}

/**
 * Used for the Top Developers display
 */
export interface TopDeveloperEntry {
  username: string;
  trust_score: number;
}

/**
 * Standard GenLayer Transaction Receipt
 */
export interface TransactionReceipt {
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  hash: string;
  blockNumber?: number;
  output?: any; // Contains the return value of evaluate_user
  [key: string]: any;
}

/**
 * Filter options for the evaluation table
 */
export interface EvaluationFilters {
  minTrustScore?: number;
  language?: string;
  consistency?: "low" | "medium" | "high";
}