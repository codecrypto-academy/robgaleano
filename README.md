# Web 2.5 Faucet

A comprehensive token faucet system that bridges Web2 and Web3 technologies, allowing developers and users to request and receive testnet tokens for development, testing, and educational purposes.

## Project Overview

The Web 2.5 Faucet combines traditional web infrastructure with blockchain technology to create a secure and user-friendly experience for obtaining testnet tokens. This project consists of three main components:

- **Frontend**: React-based UI for requesting tokens and managing wallet connections
- **Backend**: Node.js/Express API handling token distribution and request validation
- **Ethereum Node**: Optional private Ethereum node setup for local development

## Features

- Connect wallet and request testnet tokens through a clean, intuitive interface
- Email verification system to prevent abuse
- Rate limiting and anti-spam mechanisms
- Transaction status tracking
- Blockchain integration for token distribution
- Admin statistics and monitoring

## Technology Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Modern responsive UI components

### Backend
- Node.js/Express
- Integration with blockchain nodes
- Email verification service

### Ethereum Node (Optional)
- Private Ethereum node via Docker
- Custom genesis configuration
- Isolated test environment

## Getting Started

### Prerequisites
- Node.js (v22+)
- Yarn package manager
- Access to Ethereum testnet node (Sepolia, Goerli, or local node)
- Wallet with testnet ETH for funding the faucet

### Installation and Setup

#### Backend Setup
1. Install backend dependencies:
```bash
cd backend
yarn install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the backend server:
```bash
yarn dev
```

#### Frontend Setup
1. Install frontend dependencies:
```bash
cd frontend
yarn install
```

2. Start the development server:
```bash
yarn dev
```

3. Access the application at http://localhost:3000

#### Ethereum Node Setup (Optional)
If you want to run a private Ethereum node for development:

1. Create an account:
```bash
docker run -v ./pwd.txt:/pwd.txt -v ./data:/data ethereum/client-go:v1.13.15 \
 account new --datadir /data --password /pwd.txt
```

2. Initialize the node with genesis.json:
```bash
docker run -v ./genesis.json:/genesis.json -v ./data:/data ethereum/client-go:v1.13.15 \
 init --datadir /data /genesis.json 
```

3. Deploy the node:
```bash
docker run --rm \
 -v ./pwd.txt:/pwd.txt \
 -v ./data:/data \
 -p 5556:8545 \
 ethereum/client-go:v1.13.15 \
 --datadir /data \
 --unlock ${signerAddress} \
 --allow-insecure-unlock \
 --mine \
 --miner.etherbase ${signerAddres} \
 --password /pwd.txt \
 --nodiscover \
 --http \
 --http.addr "0.0.0.0" \
 --http.api "admin,eth,debug,miner,net,txpool,personal,web3" \
 --http.corsdomain "*"
```

## Project Structure

```
web2.5-faucet/
├── backend/          # Express API server
│   ├── src/          # Backend source code
│   └── ...config files
├── frontend/         # React application
│   ├── public/       # Public assets
│   ├── src/          # Frontend source code
│   └── ...config files
└── eth-node/         # Ethereum node setup files (optional)
    ├── data/         # Node data directory
    ├── genesis.json  # Genesis configuration
    └── pwd.txt       # Account password file
```

## API Endpoints

- `GET /api/balance/:address`: Obtain balance from a specific account using Metamask get_Balance
- `GET /api/balanceEthers/:address`: Obtain balance from a specific account using Ethers.js
- `GET /api/faucet/:address/:amount`: Top-up a reduced amount of balance from the node

## Ethereum Node Disclaimer

**Important:** The Ethereum node provided is for demonstration and development purposes only. No real Ether is used, and all accounts created are for testing purposes. Do not attempt to use this setup for production applications or with real cryptocurrency assets.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Ethereum Foundation for testnet infrastructure
- The broader Web3 community for inspiration and support
