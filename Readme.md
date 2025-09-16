# InfluenceHub

> **The first gamified on-chain reputation layer for content creators**

InfluenceHub is a revolutionary platform running on the Stellar blockchain with Soroban smart contracts, transforming engagement (likes, views, conversions) into XP, levels, and automatically paid rewards — like "Twitch + Steemit + Reflector for influencers".

## 🎯 The Problem

Creators are exploited: centralized platforms take up to 70% of revenue, metrics are opaque, reputation is not portable. Brands spend $21B/year without being able to measure ROI (Return of Investment). There's no fair, transparent, and global reputation system for creators.

## 💡 The Solution

InfluenceHub gamifies performance: every action becomes XP → Badges → Levels → access to premium campaigns. Smart contracts automatically pay when goals are hit (e.g., "10K views = 50 XLM"). Everything recorded on blockchain — transparent, cheap, global. Creators maintain total control of reputation and revenue.

## ⭐ Why Stellar-Soroban?

- **Near-zero fees** → ideal for micropayments
- **Global and inclusive infrastructure**
- **Soroban just launched** — we're pioneers bringing gamification and tokenized reputation for creators to this stack

## 🏗️ Technical Architecture

### Smart Contracts (Soroban)

#### ReputationContract
- **Function**: Gamified reputation system for creators
- **Public methods (current ABI)**:
  - `initialize(admin)`
  - `reward_with_price_check(user, amount, token, oracle_id)`
  - `reward_with_tokens(user, amount, _token)`
  - `get_level(user) -> u32`
- **Security**: XP cap per tx and overflow protections
- **Gamification**: Level system based on XP

#### Kale Token ($KALE)
- **Function**: Native fungible token of the ecosystem
- **Features**:
  - Implements Stellar-compatible token standard
  - Admin-controlled minting
  - Integration with reputation system
  - Automatic payments to creators
- **Specifications**: 18 decimals, symbol "KALE"
- **Utility**: Access to premium campaigns, exclusive analytics, Pro subscription

### Frontend (React + TypeScript)
- **Creator Dashboard**: XP, levels, badges, and campaigns visualization
- **Campaign Marketplace**: Where brands create campaigns and creators apply
- **On-Chain Analytics**: Transparent engagement and ROI metrics
- **Wallet Integration**: Connection with Freighter and other Stellar wallets
- **Badge System**: Achievement and reputation visualization

## 🎮 Gamification System

### Creator Levels
- **Level 1**: 0-100 XP (Beginner)
- **Level 2**: 101-500 XP (Creator)
- **Level 3**: 501-1,000 XP (Influencer)
- **Level 4**: 1,001-10,000 XP (Micro-Influencer)
- **Level 5+**: 10,001+ XP (Macro-Influencer)

### Available Badges
- 🎯 **Engagement Master**: 10K+ likes on a single post
- 📈 **Growth Hacker**: 50K+ views in one week
- 💰 **Conversion King**: 5%+ conversion rate
- 🔥 **Viral Creator**: 1M+ views in 24h
- ⭐ **Community Builder**: 10K+ engaged followers

### Automatic Rewards
- **Micropayments**: XLM paid automatically when hitting goals
- **$KALE Tokens**: For access to premium features
- **Exclusive Campaigns**: Premium brand access by level
- **Advanced Analytics**: Detailed performance data

## 💼 Business Model

### Main Revenue Streams
- **10% fee** on B2B campaigns (brands pay creators)
- **Pro subscription** in $INFLU for analytics and exclusive campaigns
- **2% fee** on token swaps on the platform
- **White-label SaaS** for marketing agencies
- **Premium Analytics** (on-chain + off-chain data)

### Traction (MVP in 6 months)
- ✅ 500 micro-influencers registered
- ✅ 20 pilot campaigns with real brands
- ✅ 1 functional oracle (Instagram/TikTok → Soroban)
- ✅ Stellar Community Fund submission
- ✅ Team: 3 founders — Stellar/Soroban Engineer, serial entrepreneur (40+ years), UX/UI specialist

## 📊 Market

- **$21B in 2023** → **$100B by 2030**
- **50M+ creators** worldwide
- **Gamification increases engagement by 3x**
- **Tokenization via blockchain** solves transparency and micropayments
- **Stellar is the ideal infrastructure** for this use case

## 🚀 12-Month Roadmap

### M1-3: Prototype + Validation
- Functional prototype + Soroban contract
- Validation with 10 creators
- Stellar Community Fund application

### M4-6: Beta + Expansion
- Beta with 50 creators
- 5 paid campaigns
- Y Combinator W25 application (Sep/2024)

### M7-9: Launch + Partnerships
- Official $INFLU token launch
- Marketing agency partnership
- 500 active creators

### M10-12: Scale + SaaS
- White-label SaaS for agencies
- YouTube/TikTok integration
- Initial revenue → prepare pre-seed

## 🛠️ How to Run the Project

### Prerequisites
- [Rust](https://rustup.rs/) (to compile smart contracts)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (package manager)
- [Soroban CLI](https://soroban.stellar.org/docs/getting-started/setup#install-the-soroban-cli)
- [Freighter Wallet](https://freighter.app/) (Stellar wallet)

### Frontend (Web Interface)
```bash
cd frontend
pnpm install
pnpm dev
# Access http://localhost:5173
```

#### Soroban bindings (Reputation contract) in the frontend

We consume the generated bindings directly from the contracts workspace. The client is wrapped in `frontend/src/soroban/reputationClient.ts`.

Minimal example:

```ts
import { Networks } from '@stellar/stellar-sdk';
import { Client as ReputationClient } from '../../contract/contracts/reputation_contract/soroban-bindings/src';

const client = new ReputationClient({
  contractId: 'CDOLWY7CVGFCT66A2TSXYKBEVFD4GAWWU2IC26YTE5QWFFSP2LGVUB37',
  networkPassphrase: Networks.TESTNET,
  rpcUrl: 'https://soroban-testnet.stellar.org',
});

// view
const tx = await client.get_level({ user: 'G...PUBLIC_KEY' });
console.log('level', tx.result);

// write (sign + send): reward with price verification via oracle
await client
  .reward_with_price_check({
    user: 'G...PUBLIC_KEY',
    amount: BigInt(500),
    token: 'CD...TOKEN_CONTRACT_ID',
    oracle_id: 'CDPP6IXK73UMODNZZW7RT6ILZI25KQHIHHMDKL27VB5IQUZBAWOR25BV',
  })
  .signAndSend();
```

Already configured helpers live in `frontend/src/soroban/reputationClient.ts`:

```ts
import { getReputationLevel, rewardWithPriceCheck } from '../soroban/reputationClient';
```

Vite adjustments (already applied):
- `vite.config.ts` includes `@stellar/stellar-sdk/contract` and `/rpc` in `optimizeDeps.include` and allows reading from `../contract`.
- Ensure `@stellar/stellar-sdk` version `^14.1.1` or newer.

### Smart Contracts
```bash
cd contract
cargo build --target wasm32-unknown-unknown --release
cargo test
```

### Deploy to Testnet
```bash
# Deploy reputation contract
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/reputation_contract.wasm \
  --source-account <your-account>

# Deploy KALE token (adjust the wasm path to your token build artifact)
soroban contract deploy \
  --wasm <path-to-your-kale-token-wasm> \
  --source-account <your-account>
```

## 🏗️ Project Structure

```
influencehub/
├── contract/                    # Soroban Smart Contracts
│   ├── contracts/
│   │   ├── reputation_contract/ # Gamified reputation system
│   │   │   ├── src/
│   │   │   │   ├── lib.rs      # XP, levels and badges logic
│   │   │   │   └── test.rs     # Reputation system tests
│   │   │   └── Cargo.toml
│   │   └── influencehub/       # $INFLU Token
│   │       ├── src/
│   │       │   ├── lib.rs      # Fungible token with utility
│   │       │   └── test.rs     # Token tests
│   │       └── Cargo.toml
│   ├── Cargo.toml              # Rust workspace
│   └── README.md
├── frontend/                   # React Web Interface
│   ├── src/
│   │   ├── views/             # Application pages
│   │   │   ├── CreatorDashboard.tsx    # Creator dashboard
│   │   │   ├── CampaignMarketplace.tsx # Campaign marketplace
│   │   │   ├── AnalyticsPage.tsx       # On-chain analytics
│   │   │   ├── BadgesPage.tsx          # Badge system
│   │   │   └── RankingPage.tsx         # Creator rankings
│   │   ├── state/             # State management
│   │   ├── ui/                # Interface components
│   │   ├── hooks/             # Custom hooks
│   │   └── types/             # TypeScript types
│   └── package.json
└── README.md                  # This file
```

## 🔗 Reflector Oracle Integration

`reward_with_price_check` validates rewards against a trusted oracle (Reflector) on Soroban. Pass the oracle contract id as `oracle_id` when rewarding. The binding uses snake_case, so if you pass camelCase in app code map it accordingly (already handled in `reputationClient.ts`).

Typical flow:
- App (off-chain) collects engagement metrics
- Reflector oracle publishes/verifies price/metric data on-chain
- App calls `reward_with_price_check(user, amount, token, oracle_id)` to mint XP-backed rewards only when the oracle validation succeeds

## 📱 On‑chain Reputation in the UI

The Profile page shows an “On‑chain reputation” card. When a wallet is connected, it queries `get_level(user)` through the generated client and displays the result.

## 🎯 Technologies

### Blockchain & Smart Contracts
- [Soroban](https://soroban.stellar.org/) - Stellar's smart contract platform
- [Rust](https://rustup.rs/) - Language for smart contracts
- [Soroban SDK](https://docs.rs/soroban-sdk/) - Official SDK
- [Stellar Tokens](https://github.com/stellar/rs-soroban-token) - Token standards

### Frontend
- [React](https://react.dev/) - User interface
- [TypeScript](https://www.typescriptlang.org/) - Static typing
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Freighter](https://freighter.app/) - Wallet integration

### Integrations
- **Oracles**: Instagram, TikTok, YouTube APIs
- **Analytics**: On-chain + off-chain data
- **Payments**: XLM for automatic micropayments

## ✅ Implemented vs 🧭 Roadmap

### Implemented now
- Reputation contract (Soroban)
  - `initialize`, `get_level`, `reward_with_tokens`, `reward_with_price_check`
  - Testnet deployment ready (example contract id in code)
- Frontend (React + TS)
  - Wallet connection (Freighter/Wallets Kit)
  - On-chain reputation card in `ProfilePage` using generated bindings
  - Soroban binding wired via `frontend/src/soroban/reputationClient.ts`
  - Vite configured to resolve `@stellar/stellar-sdk/contract` and `/rpc`
- Token economics
  - Token placeholder updated to KALE ($KALE)

### Roadmap (to be implemented)
- Oracle (Reflector) end-to-end
  - Production oracle contract and publishing pipeline
  - UI flows to trigger price/metric checked rewards
- Token ($KALE)
  - Deploy KALE token contract and integrate mint/transfer flows
  - Rewards paid out in KALE where applicable
- Additional views
  - Campaign marketplace, advanced analytics, full ranking UX polish
- Multi-wallet UX and persistent session/auto-reconnect
- CI/CD, audit, and production hardening

## 🎮 Demo Users

### Content Creator
- **Email**: `creator@influencehub.life`
- **Password**: `creator123`
- **Level**: 3 (Influencer)
- **XP**: 750 points

### Brand/Advertiser
- **Email**: `brand@influencehub.life`
- **Password**: `brand123`
- **Type**: Premium campaigns

### Admin
- **Email**: `admin@influencehub.life`
- **Password**: `admin123`
- **Access**: Full platform control

## 🔮 Future Vision

We're capturing real value from a **$100B market** — tokenizing reputation, automating trust, and gamifying growth. At InfluenceHub, your talent becomes XP, your effort becomes reward, and your reputation becomes your greatest asset.

**Creators deserve more than likes. Welcome to the future of the creator economy — fair, fun, and on-chain.**

---

## 📞 Contact

- **Website**: [influencehub.life](https://influencehub.life)
- **Twitter**: [@InfluenceHub](https://twitter.com/influencehub)
- **Discord**: [InfluenceHub Community](https://discord.gg/influencehub)
- **Email**: hello@influencehub.life

---

*InfluenceHub - Where creators earn what they deserve* 🚀