import { Badge } from "@/components/ui/badge";
import { Context } from "@/middleware/app-context";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({
  to,
  children,
  isMobile,
}: {
  to: string;
  children: React.ReactNode;
  isMobile: boolean;
}) => {
  const baseClasses = `px-3 py-2 rounded-md font-medium ${
    isMobile ? "block text-base" : "text-sm"
  }`;
  const activeClasses = "bg-gray-900 text-white";
  const inactiveClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      {children}
    </NavLink>
  );
};

const Header = () => {
  const { appState, setAppState } = useContext(Context);
  const account = appState.account ? appState.account : null;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/faucet", label: "Faucet" },
    { to: "/balance", label: "Balance" },
    { to: "/transfer", label: "Transfer" },
  ];

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ethereum = (window as any).ethereum;
    if (ethereum) {
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => {
          setAppState({ account: accounts[0] });
        });

      ethereum.on("accountsChanged", (accounts: string[]) => {
        setAppState({ account: accounts[0] });
      });
    } else {
      alert("Please install MetaMask!");
      return;
    }
  }, [setAppState]);

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between h-16">
          <div className="text-xl font-bold">Faucet</div>

          <div className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <NavItem key={link.to} to={link.to} isMobile={false}>
                {link.label}
              </NavItem>
            ))}
          </div>

          {account ? (
            <Badge variant="secondary">{account}</Badge>
          ) : (
            <Badge variant="secondary">No Account Selected</Badge>
          )}

          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={toggleMobileMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <NavItem key={link.to} to={link.to} isMobile={true}>
                {link.label}
              </NavItem>
            ))}
          </div>
          {account ? (
            <Badge variant="secondary">{account}</Badge>
          ) : (
            <Badge variant="secondary">No Account Selected</Badge>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
