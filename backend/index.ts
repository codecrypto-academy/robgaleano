import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

const nodeUrl = process.env.NODE_URL as string;
const keystorePwd = process.env.KEYSTORE_PWD as string;
const keystorePath = process.env.KEYSTORE_PATH as string;

app.get("/api/balance/:address", async (req: Request, res: Response) => {
  const { address } = req.params;

  const request = await fetch(nodeUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [address, "latest"],
      id: 1,
    }),
  });

  const resData = await request.json();
  res.json({
    address,
    balance: Number(resData.result) / 10 ** 18,
    date: new Date().toISOString(),
  });
  res.send(resData);
});

app.get("/api/balanceEthers/:address", async (req: Request, res: Response) => {
  const { address } = req.params;
  const provider = new ethers.JsonRpcProvider(nodeUrl);
  const balance = await provider.getBalance(address);
  res.json({
    address,
    balance: ethers.formatEther(balance),
    date: new Date().toISOString(),
  });
});

app.get("/api/faucet/:address/:amount", async (req: Request, res: Response) => {
  const { address, amount } = req.params;
  const provider = new ethers.JsonRpcProvider(nodeUrl);
  const nodeKeystorePath = keystorePath;
  const nodeJsonStr = fs.readFileSync(keystorePath, "utf-8");
  const wallet = await ethers.Wallet.fromEncryptedJson(nodeJsonStr, keystorePwd);
  const connectedWallet = wallet.connect(provider);
  const tx = await connectedWallet.sendTransaction({
    to: address,
    value: ethers.parseEther(amount),
  });
  await tx.wait();

  const balance = await provider.getBalance(address);
  const serializedBalance = ethers.formatEther(balance);
  res.json({
    address,
    amount,
    balance: serializedBalance,
    date: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log("server running");
});
