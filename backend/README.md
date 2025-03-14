# Web 2.5 Faucet - Backend

Backend application that bridges Web2 and Web3 technologies, allowing users to request and receive testnet tokens.

## Overview

This project implements a token faucet system with a nodeJS backend. It enables developers and users to obtain testnet tokens for development, testing, and educational purposes.

## Features

- Get account balance, request testnet tokens and make transactions
- Rate limiting to prevent abuse
- Blockchain transaction tracking


### Backend
- Node.js/Express
- Integration with blockchain nodes

## Getting Started

### Prerequisites
- Node.js (v22+)
- Access to Ethereum testnet node (Sepolia, Goerli, CustomNet etc.)
- Wallet with testnet ETH for funding the faucet

### Installation

1. Clone the repository

2. Install backend dependencies
```bash
cd backend
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

### Environment

Edit the `.env` file with your specific configuration

## Usage

1. Start the backend server
```bash
cd backend
npm run dev
```

2. Start the frontend development server
```bash
cd frontend
npm start
```

3. Access the application at http://localhost:3000

## API Endpoints

- `GET /api/balance/:address`: Obtain balance from a specific account using Metamask get_Balance
- `GET /api/balanceEthers/:address`: Obtain balance from a specific account using Ethers.js
- `GET /api/faucet/:address/:amount`: Top-up a reduced amount of balance from the node

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Ethereum Foundation for testnet infrastructure
- The broader Web3 community for inspiration and support
