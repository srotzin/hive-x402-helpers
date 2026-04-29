/**
 * @hivecivilization/x402-helpers
 * Pre-configured x402 client for Hive Civilization services on Base mainnet.
 *
 * NOT AFFILIATED WITH COINBASE. x402 is an open protocol from the x402 foundation;
 * this package is a Hive-specific convenience wrapper.
 *
 * @see https://github.com/srotzin/hive-x402-helpers
 */
/** Hive Civilization treasury address on Base mainnet */
export declare const HIVE_TREASURY: "0x15184bf50b3d3f52b60434f8942b7d52f2eb436e";
/** Base mainnet chain ID */
export declare const HIVE_CHAIN_ID: 8453;
/** USDC contract on Base mainnet */
export declare const HIVE_USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
/**
 * Catalog of Hive Civilization x402-wired services.
 * All services are hosted on Base mainnet and accept USDC micropayments
 * routed to the Hive treasury.
 */
export declare const HIVE_SERVICES: {
    readonly evaluator: "https://api.hiveciv.com/v1/evaluator";
    readonly summarizer: "https://api.hiveciv.com/v1/summarizer";
    readonly classifier: "https://api.hiveciv.com/v1/classifier";
    readonly sentiment: "https://api.hiveciv.com/v1/sentiment";
    readonly extractor: "https://api.hiveciv.com/v1/extractor";
    readonly translator: "https://api.hiveciv.com/v1/translator";
    readonly transcriber: "https://api.hiveciv.com/v1/transcriber";
    readonly embeddings: "https://api.hiveciv.com/v1/embeddings";
    readonly reranker: "https://api.hiveciv.com/v1/reranker";
    readonly router: "https://api.hiveciv.com/v1/router";
    readonly search: "https://api.hiveciv.com/v1/search";
    readonly news: "https://api.hiveciv.com/v1/news";
    readonly research: "https://api.hiveciv.com/v1/research";
    readonly scraper: "https://api.hiveciv.com/v1/scraper";
    readonly crawler: "https://api.hiveciv.com/v1/crawler";
    readonly parser: "https://api.hiveciv.com/v1/parser";
    readonly enricher: "https://api.hiveciv.com/v1/enricher";
    readonly validator: "https://api.hiveciv.com/v1/validator";
    readonly aggregator: "https://api.hiveciv.com/v1/aggregator";
    readonly monitor: "https://api.hiveciv.com/v1/monitor";
    readonly priceOracle: "https://api.hiveciv.com/v1/price-oracle";
    readonly portfolioAnalyzer: "https://api.hiveciv.com/v1/portfolio-analyzer";
    readonly riskScorer: "https://api.hiveciv.com/v1/risk-scorer";
    readonly yieldOptimizer: "https://api.hiveciv.com/v1/yield-optimizer";
    readonly defiRouter: "https://api.hiveciv.com/v1/defi-router";
    readonly nftAnalyzer: "https://api.hiveciv.com/v1/nft-analyzer";
    readonly walletProfiler: "https://api.hiveciv.com/v1/wallet-profiler";
    readonly contractAuditor: "https://api.hiveciv.com/v1/contract-auditor";
    readonly gasEstimator: "https://api.hiveciv.com/v1/gas-estimator";
    readonly bridgeRouter: "https://api.hiveciv.com/v1/bridge-router";
    readonly documentDrafter: "https://api.hiveciv.com/v1/document-drafter";
    readonly codeReviewer: "https://api.hiveciv.com/v1/code-reviewer";
    readonly meetingNotes: "https://api.hiveciv.com/v1/meeting-notes";
    readonly taskPlanner: "https://api.hiveciv.com/v1/task-planner";
    readonly proposalWriter: "https://api.hiveciv.com/v1/proposal-writer";
    readonly emailDrafter: "https://api.hiveciv.com/v1/email-drafter";
    readonly reportGenerator: "https://api.hiveciv.com/v1/report-generator";
    readonly dataVisualizer: "https://api.hiveciv.com/v1/data-visualizer";
    readonly chartBuilder: "https://api.hiveciv.com/v1/chart-builder";
    readonly presentationMaker: "https://api.hiveciv.com/v1/presentation-maker";
    readonly kycOracle: "https://api.hiveciv.com/v1/kyc-oracle";
    readonly amlChecker: "https://api.hiveciv.com/v1/aml-checker";
    readonly reputationScorer: "https://api.hiveciv.com/v1/reputation-scorer";
    readonly identityVerifier: "https://api.hiveciv.com/v1/identity-verifier";
    readonly complianceAuditor: "https://api.hiveciv.com/v1/compliance-auditor";
    readonly ipfsGateway: "https://api.hiveciv.com/v1/ipfs-gateway";
    readonly webhookRelay: "https://api.hiveciv.com/v1/webhook-relay";
    readonly cacheLayer: "https://api.hiveciv.com/v1/cache-layer";
    readonly rateLimiter: "https://api.hiveciv.com/v1/rate-limiter";
    readonly loadBalancer: "https://api.hiveciv.com/v1/load-balancer";
};
export type HiveServiceName = keyof typeof HIVE_SERVICES;
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
export declare function createHivePayer(privateKey: `0x${string}`): typeof fetch;
/**
 * Return the full Hive service catalog without making any paid calls.
 * Safe to call at agent startup for capability discovery.
 */
export declare function discoverHiveServices(): Promise<ServiceCatalog>;
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
export declare function callHiveService(name: HiveServiceName, tool: string, args: unknown, payer: typeof fetch): Promise<unknown>;
//# sourceMappingURL=index.d.ts.map