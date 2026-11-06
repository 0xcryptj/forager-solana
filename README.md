# Forager Solana reclaim

Forager does not deploy its own Solana program for rent reclaim. The wallet signs the SPL Token and Token-2022 programs. This repository is the public description of that signed transaction: which programs, which instructions, and how the fee is calculated.

It is not a fork of the Solana programs. Their source is:

- SPL Token `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA` — https://github.com/solana-program/token
- Token-2022 `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb` — https://github.com/solana-program/token-2022

## Deployed programs

| Program | Address | Explorer |
| --- | --- | --- |
| SPL Token | `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA` | https://solscan.io/account/TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA |
| Token-2022 | `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb` | https://solscan.io/account/TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb |

Network: Solana mainnet-beta.

## What the user signs

1. For a balance that must be destroyed: `Burn`, then `CloseAccount` when the balance reaches zero.
2. For an empty token account: `CloseAccount` only. CloseAccount is refused when the account still has a balance.
3. Rent from CloseAccount is sent to the signing wallet.
4. A separate `SystemProgram.transfer` pays Forager's fee from the reclaimed lamports. The fee is `gross * feeBps / 10_000`. It is not an instruction inside the SPL Token program.

The public fee wallet shown on forag3r.app is `G8Towf96gsPAnydYZoqCGwkT5z7owa7bk84RVmam1nDg`.

## Tests

```bash
node --test
```

## License

MIT. The SPL Token and Token-2022 programs keep their own upstream licenses.
