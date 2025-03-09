// import classNames from "classnames";
// import styles from "./app.module.scss";
import Home from "@/components/home/home";
import Faucet from "@/components/faucet/faucet";
import Balance from "@/components/balance/balance";
import Transfer from "@/components/transfer/transfer";
import Dashboard from "@/layout/dashboard";
import PageNotFound from "@/components/not-found/page-not-found";
import { Route, Routes } from "react-router";

// const css = classNames.bind(styles);

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="faucet" element={<Faucet />}/>
          <Route path="balance" element={<Balance />}/>
          <Route path="transfer" element={<Transfer />}/>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
