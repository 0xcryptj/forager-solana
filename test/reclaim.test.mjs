import assert from "node:assert/strict";
import test from "node:test";
import {
  SPL_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  reclaimFeeLamports,
  signedInstructionOrder,
} from "../src/reclaim.mjs";

test("fee is gross times bps over 10_000", () => {
  assert.equal(reclaimFeeLamports(2_039_280n, 500), 101_964n);
  assert.equal(reclaimFeeLamports(0n, 500), 0n);
});

test("empty accounts close, then pay the fee", () => {
  assert.deepEqual(signedInstructionOrder({ burn: false, close: true }), [
    "CloseAccount",
    "SystemProgram.transfer",
  ]);
});

test("a balance is burned before the account can close", () => {
  assert.deepEqual(signedInstructionOrder({ burn: true, close: true }), [
    "Burn",
    "CloseAccount",
    "SystemProgram.transfer",
  ]);
});

test("program ids are the live mainnet programs", () => {
  assert.equal(SPL_TOKEN_PROGRAM_ID, "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
  assert.equal(TOKEN_2022_PROGRAM_ID, "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
});
