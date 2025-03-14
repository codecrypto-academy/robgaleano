import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/middleware/app-context";

import classNames from "classnames/bind";
import styles from "./balance.module.scss";

const css = classNames.bind(styles);

const Balance: React.FC = () => {
  const { appState } = useContext(Context);
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      alert("Please install MetaMask.");
      return;
    }

    const fetchBalance = async () => {
      try {
        // Ensure the account address has the 0x prefix
        const formattedAddress = appState.account.startsWith("0x")
          ? appState.account
          : `0x${appState.account}`;

        //? Node must be running for this to work
        const balanceHex = await ethereum.request({
          id: 1,
          jsonrpc: "2.0",
          method: "eth_getBalance",
          params: [formattedAddress, "latest"],
        });

        // Convert from wei (hex) to ETH
        const balanceInWei = parseInt(balanceHex, 16);
        const balanceInEth = balanceInWei / 1e18; // 1 ETH = 10^18 wei
        setBalance(balanceInEth.toFixed(4));
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance("Error");
      }
    };

    if (appState && appState.account) {
      fetchBalance();
    }
  }, [appState]); // Only re-run when account changes

  return (
    <div className={css("container")}>
      <h2>Token Balance in account: {appState?.account}</h2>
      <div className={css("balance-display")}>
        <p>Current Balance: {balance ? `${balance} ETH` : "Loading..."}</p>
      </div>
    </div>
  );
};

export default Balance;
