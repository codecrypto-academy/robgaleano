import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "@/middleware/app-context";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ethers } from "ethers";

import classNames from "classnames/bind";
import styles from "./transfer.module.scss";

const css = classNames.bind(styles);

type TransferForm = {
  "origin-account": string;
  "destination-account": string;
  amount: string;
};

const Transfer: React.FC = () => {
  const { appState } = useContext(Context);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ethereum = (window as any).ethereum;

  // Set up form with guaranteed defined values
  const form = useForm<TransferForm>({
    defaultValues: {
      "origin-account": appState.account ?? "",
      "destination-account": "",
      amount: "",
    },
  });

  // Update origin-account when appState.account changes
  useEffect(() => {
    if (appState.account) {
      form.setValue("origin-account", appState.account);
    }
  }, [appState.account, form]);

  const onSubmit = async (formData: TransferForm) => {
    console.log(formData);
    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner(formData["origin-account"]);
      await signer.sendTransaction({
        to: formData["destination-account"],
        value: ethers.parseEther(formData.amount),
      });
      toast.success("Transaction sent!");
    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error("Transaction failed. Please check your inputs and try again.");
    }
  };

  return (
    <div className={css("container")}>
      <h2>Transfer Tokens</h2>
      <div className={css("transfer-form")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="origin-account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origin account</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destination-account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination account</FormLabel>
                  <FormControl>
                    <Input placeholder="0x0000000" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the Ethereum address to transfer tokens to.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency amount</FormLabel>
                  <FormControl>
                    <Input placeholder="0.1 ETH" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the amount of tokens to transfer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className={css(["transfer-button", "w-full"])}>
              Transfer
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Transfer;
