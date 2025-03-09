import { Route, Routes } from "react-router";
import { AppContextProvider } from "@/middleware/context";
import Home from "@/components/home/home";
import Faucet from "@/components/faucet/faucet";
import Balance from "@/components/balance/balance";
import Transfer from "@/components/transfer/transfer";
import Dashboard from "@/layout/dashboard";
import PageNotFound from "@/components/not-found/page-not-found";

// import classNames from "classnames";
// import styles from "./app.module.scss";

// const css = classNames.bind(styles);

const App = () => {
  return (
    <>
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="faucet" element={<Faucet />} />
            <Route path="balance" element={<Balance />} />
            <Route path="transfer" element={<Transfer />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </AppContextProvider>
    </>
  );
};

export default App;
