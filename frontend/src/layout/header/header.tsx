import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Text, Button } from "@radix-ui/themes";
import { PackageOpen, ShoppingBasket } from "lucide-react";
import "./header.css";
import { Context } from "@/middleware/app-context";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ethereum = (window as any).ethereum;

const Header = () => {
  const { appState, setAppState } = useContext(Context);
  const account = appState.account ? appState.account : null;

  useEffect(() => {
    if (ethereum) {
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => {
          setAppState({ ...appState, account: accounts[0] });
        });

      ethereum.on("accountsChanged", (accounts: string[]) => {
        setAppState({ ...appState, account: accounts[0] });
      });
    } else {
      alert("Please install MetaMask!");
      return;
    }
  }, [setAppState]);

  return (
    <header className="header">
      <Box className="logo-container">
        <img src="/vite.svg" alt="Vite Logo" className="logo-image" />
        Web2.5 Basket
      </Box>
      <nav className="nav">
        <Flex className="nav-list" gap="6">
          {account && (
            <Button className="nav-link" variant="soft" color="blue" size="2">
              {account ? `Connected: ${account}` : "Connect Wallet"}
            </Button>
          )}
          <Link to="/products" className="nav-link">
            <Flex align="center" gap="2">
              <Text className="nav-link--text">Products</Text>
              <PackageOpen size={18} />
            </Flex>
          </Link>
          <Link to="/shopping-bag" className="nav-link">
            <Flex align="center" gap="2">
              <Text className="nav-link--text">Basket</Text>
              <ShoppingBasket size={18} />
            </Flex>
          </Link>
        </Flex>
      </nav>
    </header>
  );
};

export default Header;
