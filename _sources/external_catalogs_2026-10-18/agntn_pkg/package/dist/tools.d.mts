import { Technique } from "./_chunks/technique.mjs";
import "./_chunks/ballet.mjs";
import { ToolDefinition, Type } from "@agntn/tools";
export declare const statsToolDefinition: ToolDefinition<Type.TObject<{}>, Record<string, unknown>>;
export declare const collectionsToolDefinition: ToolDefinition<Type.TObject<{}>, Record<string, unknown>>;
export declare const authorsToolDefinition: ToolDefinition<Type.TObject<{}>, Record<string, unknown>>;
export declare const authorToolDefinition: ToolDefinition<Type.TObject<{
  key: Type.TString;
}>, Record<string, unknown>>;
export declare const solversToolDefinition: ToolDefinition<Type.TObject<{}>, Record<string, unknown>>;
export declare const solverToolDefinition: ToolDefinition<Type.TObject<{
  key: Type.TString;
}>, Record<string, unknown>>;
export declare const showToolDefinition: ToolDefinition<Type.TObject<{
  id: Type.TString;
  allTransactions: Type.TOptional<Type.TBoolean>;
}>, Record<string, unknown>>;
export declare const hintsToolDefinition: ToolDefinition<Type.TObject<{
  id: Type.TString;
}>, Record<string, unknown>>;
export declare const stagesToolDefinition: ToolDefinition<Type.TObject<{
  id: Type.TString;
}>, Record<string, unknown>>;
export declare const assetsToolDefinition: ToolDefinition<Type.TObject<{
  id: Type.TString;
  file: Type.TOptional<Type.TString>;
}>, Record<string, unknown>>;
export declare const listToolDefinition: ToolDefinition<Type.TObject<{
  address: Type.TOptional<Type.TString>;
  collection: Type.TOptional<Type.TString>;
  chain: Type.TOptional<Type.TEnum<["arweave", "base", "bitcoin", "bitcoincash", "decred", "dogecoin", "ecash", "ethereum", "litecoin", "monero"]>>;
  status: Type.TOptional<Type.TEnum<("claimed" | "expired" | "solved" | "swept" | "unsolved")[]>>;
  technique: Type.TOptional<Type.TEnum<Technique[]>>;
  withPubkey: Type.TOptional<Type.TBoolean>;
  limit: Type.TOptional<Type.TInteger>;
  offset: Type.TOptional<Type.TInteger>;
}>, Record<string, unknown>>;
export declare const verifyToolDefinition: ToolDefinition<Type.TObject<{
  address: Type.TOptional<Type.TString>;
  collection: Type.TOptional<Type.TString>;
  chain: Type.TOptional<Type.TEnum<["arweave", "base", "bitcoin", "bitcoincash", "decred", "dogecoin", "ecash", "ethereum", "litecoin", "monero"]>>;
  status: Type.TOptional<Type.TEnum<("claimed" | "expired" | "solved" | "swept" | "unsolved")[]>>;
  technique: Type.TOptional<Type.TEnum<Technique[]>>;
  withPubkey: Type.TOptional<Type.TBoolean>;
  id: Type.TOptional<Type.TString>;
}>, Record<string, unknown>>;
export declare const balanceToolDefinition: ToolDefinition<Type.TObject<{
  id: Type.TString;
  apiKey: Type.TOptional<Type.TString>;
}>, Record<string, unknown>>;
export declare const watchToolDefinition: ToolDefinition<Type.TObject<{
  id: Type.TString;
  since: Type.TOptional<Type.TString>;
  apiKey: Type.TOptional<Type.TString>;
}>, Record<string, unknown>>;
export declare const eligibilityToolDefinition: ToolDefinition<Type.TObject<{
  query: Type.TString;
  chain: Type.TOptional<Type.TEnum<["arweave", "base", "bitcoin", "bitcoincash", "decred", "dogecoin", "ecash", "ethereum", "litecoin", "monero"]>>;
  apiKey: Type.TOptional<Type.TString>;
}>, Record<string, unknown>>;
/**
 * `puzzles_verify` on the public server: one id per call, never a filter, because a filtered pass
 * would spend seconds of the worker's CPU on one request.
 */
export declare const publicVerifyToolDefinition: ToolDefinition<Type.TObject<{
  id: Type.TString;
}>, Record<string, unknown>>;
/** Every puzzle tool, in the order `tools/list` and the harnesses show them. */
export declare const puzzlesTools: readonly ToolDefinition[];
/** The tools the public server at puzzles.agntn.dev serves, with `puzzles_verify` held to one id. */
export declare const publicPuzzlesTools: readonly ToolDefinition[];
/** The argument a status line shows after the tool title, for the tools that take one. */
export declare const callSummaries: Readonly<Record<string, (args: Readonly<Record<string, unknown>>) => unknown>>;