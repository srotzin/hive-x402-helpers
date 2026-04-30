# @hivecivilization/x402-helpers

**Pre-configured x402 client for Hive Civilization services on Base mainnet.**

> NOT AFFILIATED WITH COINBASE. x402 is an open protocol developed at [coinbase/x402](https://github.com/coinbase/x402). This package is a Hive-specific wrapper for agent developers.

---

## 6-Line Quick Start

```typescript
import { createHivePayer, callHiveService } from "@hivecivilization/x402-helpers";

const pay = createHivePayer(`0x${process.env.AGENT_PRIVATE_KEY}`);
const result = await callHiveService("evaluator", "submit_job", { text: "Is this content high quality?" }, pay);
console.log(result);
// Your agent just paid ~$0.01 USDC on Base and got a response. Zero OAuth, zero API keys.
```

Install:
```bash
npm install @hivecivilization/x402-helpers
```

---

## What This Does

Wraps `@x402/fetch` with Hive-specific defaults so any TypeScript agent can reach 50 revenue-wired services on Base mainnet without managing HTTP 402 challenge/retry logic manually.

| Concern | Handled by |
|---|---|
| 402 challenge/retry | `@x402/fetch` |
| USDC payment routing | Pre-wired to Hive treasury |
| Chain selection | Base mainnet (chainId 8453), hardcoded |
| Token | Native USDC on Base |

---

## Treasury Verification

All micropayments route to the Hive Civilization treasury:

| Field | Value |
|---|---|
| Treasury address | `0x15184bf50b3d3f52b60434f8942b7d52f2eb436e` |
| Chain | Base mainnet (`8453`) |
| Payment token | USDC — `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |

Verify on-chain: [Basescan — Hive Treasury](https://basescan.org/address/0x15184bf50b3d3f52b60434f8942b7d52f2eb436e)

---

## Full API

### `createHivePayer(privateKey)` → `fetch`

Returns a drop-in replacement for the global `fetch` that intercepts HTTP 402 responses and automatically pays with USDC from the provided key.

```typescript
import { createHivePayer, HIVE_SERVICES } from "@hivecivilization/x402-helpers";

const pay = createHivePayer(`0x${process.env.AGENT_KEY}`);

// Use like normal fetch — 402 handling is automatic
const res = await pay(HIVE_SERVICES.summarizer, {
  method: "POST",
  body: JSON.stringify({ url: "https://example.com/article" }),
});
const summary = await res.json();
```

### `callHiveService(name, tool, args, payer)` → `Promise<any>`

Convenience wrapper that constructs the correct URL and POSTs JSON.

```typescript
import { createHivePayer, callHiveService } from "@hivecivilization/x402-helpers";

const pay = createHivePayer(`0x${process.env.AGENT_KEY}`);
const result = await callHiveService("classifier", "run", { text: "..." }, pay);
```

### `discoverHiveServices()` → `Promise<ServiceCatalog>`

Returns the full service catalog. Free to call — no payment required.

```typescript
import { discoverHiveServices } from "@hivecivilization/x402-helpers";
const catalog = await discoverHiveServices();
console.log(catalog.services.map(s => s.name));
// ["evaluator", "summarizer", "classifier", ...]
```

### Constants

```typescript
import { HIVE_TREASURY, HIVE_CHAIN_ID, HIVE_USDC, HIVE_SERVICES } from "@hivecivilization/x402-helpers";

HIVE_TREASURY  // "0x15184bf50b3d3f52b60434f8942b7d52f2eb436e"
HIVE_CHAIN_ID  // 8453
HIVE_USDC      // "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
HIVE_SERVICES  // { evaluator: "...", summarizer: "...", ... } — 50 services
```

---

## Service Catalog (50 services)

| Category | Services |
|---|---|
| AI / Evaluation | `evaluator`, `summarizer`, `classifier`, `sentiment`, `extractor`, `translator`, `transcriber`, `embeddings`, `reranker`, `router` |
| Data / Research | `search`, `news`, `research`, `scraper`, `crawler`, `parser`, `enricher`, `validator`, `aggregator`, `monitor` |
| Finance / Crypto | `priceOracle`, `portfolioAnalyzer`, `riskScorer`, `yieldOptimizer`, `defiRouter`, `nftAnalyzer`, `walletProfiler`, `contractAuditor`, `gasEstimator`, `bridgeRouter` |
| Business | `documentDrafter`, `codeReviewer`, `meetingNotes`, `taskPlanner`, `proposalWriter`, `emailDrafter`, `reportGenerator`, `dataVisualizer`, `chartBuilder`, `presentationMaker` |
| Identity / Compliance | `kycOracle`, `amlChecker`, `reputationScorer`, `identityVerifier`, `complianceAuditor` |
| Infrastructure | `ipfsGateway`, `webhookRelay`, `cacheLayer`, `rateLimiter`, `loadBalancer` |

---

## With Vercel AI SDK

```typescript
import { createHivePayer, callHiveService } from "@hivecivilization/x402-helpers";
import { tool } from "ai";
import { z } from "zod";

const pay = createHivePayer(`0x${process.env.AGENT_KEY}`);

const hiveEvaluator = tool({
  description: "Submit a job to Hive's AI evaluator service",
  parameters: z.object({ text: z.string() }),
  execute: async ({ text }) => callHiveService("evaluator", "submit_job", { text }, pay),
});
```

## With GOAT SDK

See `@goat-sdk/plugin-hive` for a plug-and-play integration.

---

## Requirements

- Node.js ≥ 18
- An EVM private key with USDC on Base mainnet
- No API keys, no OAuth, no centralized auth

---

## License

MIT — see [LICENSE](./LICENSE)

---

*Hive Civilization — intelligence infrastructure for the agent economy.*
*github.com/srotzin | steve@thehiveryiq.com*


---

## Hive Civilization

Hive Civilization is the cryptographic backbone of autonomous agent commerce — the layer that makes every agent transaction provable, every payment settable, and every decision defensible.

This repository is part of the **SETTABLE** pillar.

- thehiveryiq.com
- hiveagentiq.com
- agent-card: https://hivetrust.onrender.com/.well-known/agent-card.json
