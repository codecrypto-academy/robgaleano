/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";
import { ethers } from "ethers";
import { useState } from "react";
import { useForm } from "react-hook-form";

import EthIcon from "@/assets/eth.svg";
import { Balance } from "@/components/balance/balance";
import Button from "@/components/button/button";

import styles from "./wallet.module.scss";

const css = classNames.bind(styles);

declare global {
  interface Window {
    ethereum: any;
  }
}

interface WalletFormInputs {
  destinationAccount: string;
  transactionAmount: string;
}

// ? this exists only if there's metamask on window
const { ethereum } = window as any;

const Wallet = () => {
  const [currentAccount, setCurrentAccount] = useState<string>();
  const [transactionResult, setTransactionResult] = useState<any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WalletFormInputs>();

  if (!ethereum) {
    return null;
  }

  const handleOnSetCurrentAccount = (currentAccount: string) => {
    setCurrentAccount(currentAccount);
  };

  const onSubmit = async (formFields: WalletFormInputs) => {
    const { destinationAccount, transactionAmount } = formFields;
    const transactionParams = {
      from: currentAccount,
      to: destinationAccount,
      value: ethers.toBeHex(ethers.parseEther(transactionAmount)), // Convert to hex string
    };
    try {
      const transaction = await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParams],
      });
      setTransactionResult(transaction);
    } catch (error: any) {
      setTransactionResult(error.message);
    }
  };

  return (
    <div className={css("wallet-container")}>
      <Balance
        currencyName="ETH"
        icon={EthIcon}
        onAccountSet={handleOnSetCurrentAccount}
      />
      <form onSubmit={handleSubmit(onSubmit)} className={css("wallet-form")}>
        <div className={css("form-group")}>
          <input
            {...register("destinationAccount", {
              required: "Account is required",
            })}
            placeholder="Account"
            className={css("form-input")}
            defaultValue={"0x6780497a128954558f3e73eece4ebda4bfe0c4ba"}
          />
          {errors.destinationAccount && (
            <span className={css("error")}>
              {errors.destinationAccount.message}
            </span>
          )}
        </div>

        <div className={css("form-group")}>
          <input
            {...register("transactionAmount", {
              required: "Amount is required",
            })}
            placeholder="Amount"
            className={css("form-input")}
            defaultValue={0.012}
          />
          {errors.transactionAmount && (
            <span className={css("error")}>
              {errors.transactionAmount.message}
            </span>
          )}
        </div>

        <Button type="submit">Submit</Button>
      </form>

      <h2>{transactionResult}</h2>
    </div>
  );
};

export default Wallet;
