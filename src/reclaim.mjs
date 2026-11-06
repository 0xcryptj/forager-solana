/** SPL Token program. CloseAccount and Burn for classic token accounts. */
export const SPL_TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

/** Token-2022 program. Same CloseAccount and Burn entrypoints. */
export const TOKEN_2022_PROGRAM_ID = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";

export const SOLANA_EXPLORER = {
  splToken: `https://solscan.io/account/${SPL_TOKEN_PROGRAM_ID}`,
  token2022: `https://solscan.io/account/${TOKEN_2022_PROGRAM_ID}`,
};

/**
 * Fee taken from reclaimed lamports. Integer floor division, matching the app:
 * fee = gross * feeBps / 10_000.
 */
export function reclaimFeeLamports(grossLamports, feeBps) {
  if (grossLamports < 0n || feeBps < 0) {
    throw new Error("gross and feeBps must be non-negative");
  }
  return (grossLamports * BigInt(feeBps)) / 10_000n;
}

/**
 * Instruction order the wallet is asked to sign.
 * CloseAccount is only included when the account is empty after any burn.
 */
export function signedInstructionOrder({ burn, close }) {
  const order = [];
  if (burn) order.push("Burn");
  if (close) order.push("CloseAccount");
  order.push("SystemProgram.transfer");
  return order;
}
