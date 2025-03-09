import { Outlet } from "react-router-dom";

import Header from "./header/header";
import styles from "./dashboard.module.scss";


const Dashboard = () => {
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
