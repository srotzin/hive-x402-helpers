/**
 * @hivecivilization/x402-helpers
 * Pre-configured x402 client for Hive Civilization services on Base mainnet.
 *
 * NOT AFFILIATED WITH COINBASE. x402 is an open protocol from the x402 foundation;
 * this package is a Hive-specific convenience wrapper.
 *
 * @see https://github.com/srotzin/hive-x402-helpers
 */

// ─── Constants ──────────────────────────────────────────────────────────────

/** Hive Civilization treasury address on Base mainnet */
export const HIVE_TREASURY = "0x15184bf50b3d3f52b60434f8942b7d52f2eb436e" as const;

/** Base mainnet chain ID */
export const HIVE_CHAIN_ID = 8453 as const;

/** USDC contract on Base mainnet */
export const HIVE_USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const;

// ─── Service Catalog ────────────────────────────────────────────────────────

/**
 * Catalog of Hive Civilization x402-wired services.
 * All services are hosted on Base mainnet and accept USDC micropayments
 * routed to the Hive treasury.
 */
export const HIVE_SERVICES = {
  // AI / Evaluation Services
  evaluator:          "https://api.hiveciv.com/v1/evaluator",
  summarizer:         "https://api.hiveciv.com/v1/summarizer",
  classifier:         "https://api.hiveciv.com/v1/classifier",
  sentiment:          "https://api.hiveciv.com/v1/sentiment",
  extractor:          "https://api.hiveciv.com/v1/extractor",
  translator:         "https://api.hiveciv.com/v1/translator",
  transcriber:        "https://api.hiveciv.com/v1/transcriber",
  embeddings:         "https://api.hiveciv.com/v1/embeddings",
  reranker:           "https://api.hiveciv.com/v1/reranker",
  router:             "https://api.hiveciv.com/v1/router",

  // Data / Research Services
  search:             "https://api.hiveciv.com/v1/search",
  news:               "https://api.hiveciv.com/v1/news",
  research:           "https://api.hiveciv.com/v1/research",
  scraper:            "https://api.hiveciv.com/v1/scraper",
  crawler:            "https://api.hiveciv.com/v1/crawler",
  parser:             "https://api.hiveciv.com/v1/parser",
  enricher:           "https://api.hiveciv.com/v1/enricher",
  validator:          "https://api.hiveciv.com/v1/validator",
  aggregator:         "https://api.hiveciv.com/v1/aggregator",
  monitor:            "https://api.hiveciv.com/v1/monitor",

  // Finance / Crypto Services
  priceOracle:        "https://api.hiveciv.com/v1/price-oracle",
  portfolioAnalyzer:  "https://api.hiveciv.com/v1/portfolio-analyzer",
  riskScorer:         "https://api.hiveciv.com/v1/risk-scorer",
  yieldOptimizer:     "https://api.hiveciv.com/v1/yield-optimizer",
  defiRouter:         "https://api.hiveciv.com/v1/defi-router",
  nftAnalyzer:        "https://api.hiveciv.com/v1/nft-analyzer",
  walletProfiler:     "https://api.hiveciv.com/v1/wallet-profiler",
  contractAuditor:    "https://api.hiveciv.com/v1/contract-auditor",
  gasEstimator:       "https://api.hiveciv.com/v1/gas-estimator",
  bridgeRouter:       "https://api.hiveciv.com/v1/bridge-router",

  // Business / Productivity Services
  documentDrafter:    "https://api.hiveciv.com/v1/document-drafter",
  codeReviewer:       "https://api.hiveciv.com/v1/code-reviewer",
  meetingNotes:       "https://api.hiveciv.com/v1/meeting-notes",
  taskPlanner:        "https://api.hiveciv.com/v1/task-planner",
  proposalWriter:     "https://api.hiveciv.com/v1/proposal-writer",
  emailDrafter:       "https://api.hiveciv.com/v1/email-drafter",
  reportGenerator:    "https://api.hiveciv.com/v1/report-generator",
  dataVisualizer:     "https://api.hiveciv.com/v1/data-visualizer",
  chartBuilder:       "https://api.hiveciv.com/v1/chart-builder",
  presentationMaker:  "https://api.hiveciv.com/v1/presentation-maker",

  // Identity / Compliance Services
  kycOracle:          "https://api.hiveciv.com/v1/kyc-oracle",
  amlChecker:         "https://api.hiveciv.com/v1/aml-checker",
  reputationScorer:   "https://api.hiveciv.com/v1/reputation-scorer",
  identityVerifier:   "https://api.hiveciv.com/v1/identity-verifier",
  complianceAuditor:  "https://api.hiveciv.com/v1/compliance-auditor",

  // Infrastructure Services
  ipfsGateway:        "https://api.hiveciv.com/v1/ipfs-gateway",
  webhookRelay:       "https://api.hiveciv.com/v1/webhook-relay",
  cacheLayer:         "https://api.hiveciv.com/v1/cache-layer",
  rateLimiter:        "https://api.hiveciv.com/v1/rate-limiter",
  loadBalancer:       "https://api.hiveciv.com/v1/load-balancer",
} as const;

export type HiveServiceName = keyof typeof HIVE_SERVICES;

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ServiceCatalog {
  services: Array<{
    name: HiveServiceName;
    url: string;
    chainId: number;
    treasury: string;
    paymentToken: string;
  }>;
  treasury: string;
  chainId: number;
  paymentToken: string;
}

// ─── createHivePayer ────────────────────────────────────────────────────────

/**
 * Create a fetch-compatible function pre-wired for Hive x402 payments.
 *
 * Wraps @x402/fetch's `wrapFetchWithPaymentFromConfig` with:
 * - Base mainnet (eip155:8453) network pre-selected
 * - ExactEvmScheme using EIP-3009 USDC transfers
 * - Payment routed to Hive treasury automatically via 402 challenge
 *
 * @param privateKey - EVM private key (0x-prefixed) that funds micropayments
 * @returns A drop-in replacement for `fetch` that handles 402 challenges
 *          automatically, routing USDC payments to the Hive treasury.
 *
 * @example
 * ```typescript
 * import { createHivePayer, HIVE_SERVICES } from "@hivecivilization/x402-helpers";
 *
 * const pay = createHivePayer(`0x${process.env.AGENT_PRIVATE_KEY}`);
 * const result = await pay(HIVE_SERVICES.evaluator, {
 *   method: "POST",
 *   body: JSON.stringify({ text: "analyze this" })
 * });
 * const data = await result.json();
 * ```
 */
export function createHivePayer(privateKey: `0x${string}`): typeof fetch {
  // Lazy-init so bundlers can tree-shake if createHivePayer is unused.
  let _client: typeof fetch | null = null;

  const getClient = async (): Promise<typeof fetch> => {
    if (_client) return _client;

    const { wrapFetchWithPaymentFromConfig } = await import("@x402/fetch");
    const { ExactEvmScheme } = await import("@x402/evm");
    const { privateKeyToAccount } = await import("viem/accounts");

    const account = privateKeyToAccount(privateKey);

    _client = wrapFetchWithPaymentFromConfig(fetch, {
      schemes: [
        {
          network: "eip155:8453", // Base mainnet
          client: new ExactEvmScheme(account as any),
        },
      ],
    });

    return _client;
  };

  return (async (input: RequestInfo | URL, init?: RequestInit) => {
    const client = await getClient();
    return client(input as any, init);
  }) as typeof fetch;
}

// ─── discoverHiveServices ───────────────────────────────────────────────────

/**
 * Return the full Hive service catalog without making any paid calls.
 * Safe to call at agent startup for capability discovery.
 */
export async function discoverHiveServices(): Promise<ServiceCatalog> {
  const services = (
    Object.entries(HIVE_SERVICES) as [HiveServiceName, string][]
  ).map(([name, url]) => ({
    name,
    url,
    chainId: HIVE_CHAIN_ID,
    treasury: HIVE_TREASURY,
    paymentToken: HIVE_USDC,
  }));

  return {
    services,
    treasury: HIVE_TREASURY,
    chainId: HIVE_CHAIN_ID,
    paymentToken: HIVE_USDC,
  };
}

// ─── callHiveService ────────────────────────────────────────────────────────

/**
 * Call a named Hive service tool with a pre-configured payer fetch function.
 *
 * @param name    - Key from HIVE_SERVICES
 * @param tool    - Tool/endpoint name within the service
 * @param args    - JSON-serialisable arguments for the tool
 * @param payer   - fetch-compatible function returned by createHivePayer()
 * @returns Parsed JSON response from the service
 *
 * @example
 * ```typescript
 * const pay = createHivePayer(`0x${process.env.AGENT_PRIVATE_KEY}`);
 * const result = await callHiveService("evaluator", "submit_job", { text: "analyze this" }, pay);
 * ```
 */
export async function callHiveService(
  name: HiveServiceName,
  tool: string,
  args: unknown,
  payer: typeof fetch
): Promise<unknown> {
  const baseUrl = HIVE_SERVICES[name];
  if (!baseUrl) {
    throw new Error(
      `Unknown Hive service: "${name}". Valid services: ${Object.keys(HIVE_SERVICES).join(", ")}`
    );
  }

  const url = `${baseUrl}/${tool}`;
  const response = await payer(url as any, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Hive-Client": "@hivecivilization/x402-helpers@1.0.0",
    },
    body: JSON.stringify(args),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Hive service "${name}/${tool}" returned ${response.status}: ${text}`
    );
  }

  return response.json();
}
