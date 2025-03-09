import React from 'react';
import styles from './home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to Web2.5 Faucet</h1>
      <p>Get started by connecting your wallet and requesting tokens.</p>
    </div>
  );
};

export default Home;
