# Web 2.5 Shop Basket

A comprehensive token based shopping e-commerce that bridges Web2 and Web3 technologies, allowing developers and users to mine send and receive testnet tokens for a shopping experience meant for development, testing, and educational purposes.

## Project Overview

The Web 2.5 Shop Basekt combines traditional web infrastructure with blockchain technology to create a secure and user-friendly experience for obtaining testnet tokens from the genesis network. This project consists of three main components:

- **Frontend**: React-based UI for managing wallet connections, and send tokens from a wallet to another when purchasing a product
- **Backend**: Node.js/Express API handling request validation from demo e-com store products
- **Ethereum Node**: Optional private Ethereum node setup for local development

## Features

- Connect wallet and request testnet tokens through a clean, intuitive interface
- Rate limiting and anti-spam mechanisms
- Transaction status tracking
- Blockchain integration for token distribution

## Technology Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Modern responsive UI components

### Backend
- Node.js/Express
- Postgres DB
- Podman
- Integration with blockchain nodes

### Ethereum Node (Optional)
- Private Ethereum node using Podman
- Custom genesis configuration
- Isolated test environment

## Getting Started

### Prerequisites
- Node.js (v22+)
- Yarn package manager
- Access to Ethereum testnet node (Sepolia, Goerli, or local node)
- Wallet (Metamask) with testnet ETH for funding the faucet

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

3. Setup the database on Podman:
```bash
yarn podman:db
```
4. Run any public SQL script to create the Northwind demo DB and it's data for Postgres

4. Start the backend server:
```bash
yarn start
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

3. Access the application at http://localhost:5173

#### Ethereum Node Setup (Optional)
You need to run a private Ethereum node for development and testing:

1. Create an account:
```bash
yarn node-account
```
After account creation make sure to modify the generated account data into the genesis.json file so the node account funds are loaded into the testnet and on the alloc parameter add your test account as well for testing the transactions.

2. Initialize the node with genesis.json:
```bash
yarn node-genesis
```

3. Deploy the node:
```bash
yarn node-launch
```

## Project Structure

```
web2.5-shop-basket/
├── backend/                # Express API server
│   ├── src/                # Backend source code
│   └── ...config files
├── frontend/               # React application
│   ├── public/             # Public assets
│   ├── src/                # Frontend source code
│   └── ...config files
└── eth-node/               # Ethereum node setup files (optional)
    ├── data/               # Node data directory
    ├── ${script}.bash      # Node generation scripts
    ├── genesis.json        # Genesis configuration
    └── pwd.txt             # Account password file
```

## API Endpoints

- `GET /products`: Get all the products from the Northwind database
- `GET /products/:id`: Get a sprecific product by id from the Northwind database

## Ethereum Node Disclaimer

**Important:** The Ethereum node provided is for demonstration and development purposes only. No real Ether is used, and all accounts created are for testing purposes. Do not attempt to use this setup for production applications or with real cryptocurrency assets.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Ethereum Foundation for testnet infrastructure
- The broader Web3 community for inspiration and support
