/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum: any;
  }
}

import classNames from "classnames/bind";

import styles from "./balance.module.scss";

const css = classNames.bind(styles);

interface BalanceProps {
  currencyName: string;
  onAccountSet: (account: string) => void;
  icon?: string;
}

// ? this exists only if there's metamask on window
const { ethereum } = window as any;

export const Balance: React.FC<BalanceProps> = ({
  currencyName,
  icon,
  onAccountSet,
}) => {
  const [account, setAccount] = useState<string>();
  const [balance, setBalance] = useState<number>();

  if (!ethereum) {
    return (
      <div className={css("card")}>
        <div className={css("account")}>Install Metamask...</div>
      </div>
    );
  }

  const cleanEthEventListener = () => {
    return () => {
      ethereum.removeListener("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0]);
        onAccountSet(accounts[0]);
      });
    };
  };

  useEffect(() => {
    const provider = new ethers.BrowserProvider(ethereum);
    provider
      .send("eth_requestAccounts", [])
      .then(async (accounts: string[]) => {
        const currentAccount = accounts[0];
        setAccount(currentAccount);
        onAccountSet(currentAccount);

        // Add event listener directly to ethereum provider
        ethereum.on("accountsChanged", (accounts: string[]) => {
          setAccount(accounts[0]);
          onAccountSet(accounts[0]);
        });
      });

    // Cleanup event listener
    cleanEthEventListener();
  }, []);

  useEffect(() => {
    if (!!account) {
      const provider = new ethers.JsonRpcProvider(
        "https://sepolia.infura.io/v3/f99515f42d274d0e9de79caad7605875"
      );
      provider.getBalance(account).then((balance) => {
        const finalBalance = Number(ethers.formatEther(balance));
        setBalance(finalBalance);
      });
    }
  }, [account, onAccountSet]);

  return (
    <div className={css("card")}>
      {account ? (
        <div className={css("account")}>{account}</div>
      ) : (
        <div className={css("account")}>Connect an account...</div>
      )}
      {account && balance && (
        <div className={css("amount")}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currencyName,
          }).format(balance)}
          <div className={css("currency-info")}>
            <div className={css("icon-wrapper")}>
              <img src={icon}></img>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
