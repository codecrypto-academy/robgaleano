import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";

import Header from "./header/header";
import styles from "./dashboard.module.scss";
import { Context } from "@/middleware/app-context";

const Dashboard = () => {
  const { setAppState } = useContext(Context);

  useEffect(() => {
    setAppState({ account: "xxxxxx:321" });
  }, [setAppState]);

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>{/* Your footer content */}</footer>
    </div>
  );
};

export default Dashboard;
