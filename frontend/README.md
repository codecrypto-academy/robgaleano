# Web 2.5 Faucet - Frontend

This repository contains the frontend application for the Web 2.5 Faucet project, allowing users to request testnet tokens for development and testing purposes.

## Project Overview

The Web 2.5 Faucet is a tool that provides developers with testnet tokens to use while building and testing dApps. The frontend offers an easy-to-use interface for requesting tokens by connecting a wallet and submitting requests.

## Technology Stack

- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Next-generation frontend tooling
- **Yarn**: Package management

## Getting Started

### Prerequisites

- Node.js (v22 or later)
- Yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/web2.5-faucet.git
   cd web2.5-faucet/frontend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

4. Build for production:
   ```bash
   yarn build
   ```

## Project Structure

```
frontend/
├── public/          # Public assets
├── src/
│   ├── assets/      # Project assets (images, etc.)
│   ├── components/  # Reusable UI components
│   ├── hooks/       # Custom React hooks
│   ├── pages/       # Application pages
│   ├── services/    # API services and wallet connections
│   ├── App.tsx      # Main application component
│   └── main.tsx     # Application entry point
└── ...config files
```

## Additional Information

### Development Notes

Vite provides HMR (Hot Module Replacement) for a smoother development experience. The project is configured with ESLint for code quality.

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build locally
- `yarn lint` - Run ESLint
- `yarn test` - Run tests (if configured)

### Contributing

Please follow the project's coding standards and submit pull requests for any new features or bug fixes.

## License

[Specify your license here]
