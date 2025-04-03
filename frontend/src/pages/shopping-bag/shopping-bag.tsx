import { Context } from "@/middleware/app-context";
import { ProductCart } from "@/types/product";
import {
  Container,
  Heading,
  Text,
  Flex,
  Card,
  DataList,
  Button,
  Box,
  Callout,
} from "@radix-ui/themes";
import { useContext, useState } from "react";
import { ethers } from "ethers";
import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ethereum = (window as any).ethereum;

// Access environment variable via import.meta.env (for Vite)
const E_COMMERCE_ACCOUNT = import.meta.env?.VITE_E_COMMERCE_ACCOUNT;

const ShoppingBag = () => {
  const { appState, setAppState } = useContext(Context);
  const { cart, account } = appState as {
    cart: ProductCart[];
    account: string;
  };
  const [tx, setTx] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Calculate the total price of all items in the cart
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => {
        return total + (item.unit_price || 0) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.product_id !== productId);
    setAppState({ ...appState, cart: updatedCart });
  };

  // Handle payment with Ethereum
  const handlePayment = async () => {
    if (!account || !ethereum) {
      alert("Please connect your wallet first");
      return;
    }
    // Convert total to ETH equivalent (simplified example - in real app you would use an oracle)
    const totalEth = ethers.toBeHex(
      ethers.parseEther(calculateTotal().toString())
    );
    const txParams = {
      to: E_COMMERCE_ACCOUNT,
      from: account,
      value: totalEth,
    };

    try {
      setLoading(true);
      const txHash = await ethereum.request({
        method: "eth_sendTransaction",
        params: [txParams],
      });

      setTx(txHash);
      toast.success("Transaction sent!", {
        position: "top-right",
        richColors: true,
      });

      // Clear cart after successful payment
      setAppState({ ...appState, cart: [] });
    } catch (error) {
      toast.error(`Payment failed. Please try again. Error: ${error}`, {
        position: "top-right",
        richColors: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="3" className="py-8">
      <Heading size="6" mb="4">
        Your Shopping Bag
      </Heading>
      {cart.length > 0 ? (
        <Flex gap="4" direction={{ initial: "column", md: "row" }}>
          <Card className="md:w-3/4">
            <DataList.Root className="p-4">
              {cart.map((item) => (
                <DataList.Item key={item.product_id}>
                  <DataList.Label>{item.product_name}</DataList.Label>
                  <DataList.Value>
                    <Flex className="w-full" justify="between" align="center">
                      <Text>Qty: {item.quantity}</Text>
                      <Text>
                        $
                        {item.unit_price
                          ? (item.unit_price * item.quantity).toFixed(2)
                          : "N/A"}
                      </Text>
                      <Button
                        variant="soft"
                        color="red"
                        size="1"
                        onClick={() => removeFromCart(item.product_id)}
                      >
                        Remove
                      </Button>
                    </Flex>
                  </DataList.Value>
                </DataList.Item>
              ))}
              <DataList.Item className="border-t border-neutral-200 pt-2">
                <DataList.Label>Total</DataList.Label>
                <DataList.Value>
                  <Flex className="w-full" justify="end" align="center">
                    <Text weight="bold">${calculateTotal()}</Text>
                  </Flex>
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Card>

          {/* Payment Section */}
          <Card className="md:w-1/4">
            <Box p="4">
              <Heading size="3" mb="2">
                Payment
              </Heading>
              <Text as="div" size="2" mb="4">
                Complete your purchase with Ethereum
              </Text>

              <Flex direction="column" gap="3">
                <Text weight="bold">Total: ${calculateTotal()}</Text>
                <Button
                  style={{ padding: "4px" }}
                  onClick={handlePayment}
                  disabled={loading}
                  color="purple"
                  size="3"
                >
                  {loading ? "Processing..." : "Pay with Ethereum"}
                </Button>

                {tx && (
                  <Callout.Root color="green" size="1">
                    <Callout.Text>
                      Transaction successful!
                      <Box mt="1">
                        <Text size="1" as="div">
                          TX: {tx.substring(0, 12)}...
                          {tx.substring(tx.length - 8)}
                        </Text>
                      </Box>
                    </Callout.Text>
                  </Callout.Root>
                )}
              </Flex>
            </Box>
          </Card>
        </Flex>
      ) : (
        <Card>
          <Flex align="center" justify="center" p="6">
            <Text>Your bag is empty</Text>
          </Flex>
        </Card>
      )}
    </Container>
  );
};

export default ShoppingBag;
