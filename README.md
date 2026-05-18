# On-Chain Prediction Arena

A multi-game on-chain prediction platform powered by Monad and AI.

## Tech Stack

- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS
- ethers.js for blockchain interaction
- MetaMask wallet integration

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Fill in your contract addresses and Monad network details in `.env.local`.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Loot Rarity Prediction**: Predict treasure rarity using GPS (mocked)
- **Dungeon Fight Prediction**: Battle against AI and stake on outcomes
- **Market Direction Prediction**: Predict crypto market movements with AI hints

## Smart Contracts

The frontend expects three smart contracts:
- Loot Contract
- Dungeon Contract
- Market Contract

Update the contract addresses in `.env.local` and replace the ABIs in `lib/contracts.ts` with your actual contract ABIs.

