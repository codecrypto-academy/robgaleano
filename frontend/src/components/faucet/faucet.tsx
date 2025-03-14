import React, { useContext, useState } from "react";
import { Context } from "@/middleware/app-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { apiHost } from "@/constants/constants";
import { Loader } from "lucide-react";

import classNames from "classnames/bind";
import styles from "./faucet.module.scss";

const css = classNames.bind(styles);

const Faucet: React.FC = () => {
  const { appState } = useContext(Context);
  const [amount, setAmount] = useState("1"); // Default amount
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleRequestTokens = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    try {
      if (!appState.account) {
        toast.warning("Please connect your wallet first");
        return;
      }

      setIsLoading(true); // Set loading state to true while fetching

      // Using the GET endpoint format from the backend
      const response = await fetch(
        `${apiHost.BACKEND_URL}/api/faucet/${appState.account}/${amount}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(`Success! ${data.amount} ETH sent to your account.`);
      } else {
        toast.error(`Failed to request tokens: ${data.message}`);
      }
    } catch (error) {
      console.error("Error requesting tokens:", error);
      toast.error("Failed to request tokens. See console for details.");
    } finally {
      setIsLoading(false); // Reset loading state regardless of outcome
    }
  };

  return (
    <div className={css("container")}>
      <h2>Token Faucet Account : {appState.account}</h2>
      <div className={css("faucet-form")}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="amount">Amount (ETH):</Label>
          <Input
            id="amount"
            type="text"
            placeholder="Insert desired amount"
            onChange={handleAmountChange}
            value={amount}
            disabled={true}
          />
        </div>
        <button
          className={css("request-button")}
          onClick={handleRequestTokens}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center align-middle">
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </span>
          ) : (
            "Request Tokens"
          )}
        </button>
      </div>
    </div>
  );
};

export default Faucet;
