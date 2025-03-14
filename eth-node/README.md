# Ethereum Demo Node

## Overview
This project sets up a private Ethereum node for development, research, and learning purposes. It is not connected to any production network and does not involve real assets or accounts. The purpose of this node is purely educational, allowing you to experiment with Ethereum blockchain technology in a safe, isolated environment.

## Disclaimer
**Important:** This is a demo environment only. No real Ether is used, and all accounts created are for testing purposes. Do not attempt to use this setup for production applications or with real cryptocurrency assets.

## Node Setup Instructions (Docker)

1. Create an account 

```bash
docker run -v ./pwd.txt:/pwd.txt -v ./data:/data ethereum/client-go:v1.13.15 \
 account new --datadir /data --password /pwd.txt
```

2. Initialize the node with genesis.json
It's important that the chainId doesn't exist in a mainnet, using a high number like 98687658 is enough.

```bash
docker run -v ./genesis.json:/genesis.json -v ./data:/data ethereum/client-go:v1.13.15 \
 init --datadir /data /genesis.json 
 ```

3. Deploy the node

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