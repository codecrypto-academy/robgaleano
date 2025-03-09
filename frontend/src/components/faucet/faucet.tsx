import React from 'react';
import styles from './faucet.module.scss';

const Faucet: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>Token Faucet</h2>
      <div className={styles.faucetForm}>
        <button className={styles.requestButton}>
          Request Tokens
        </button>
      </div>
    </div>
  );
};

export default Faucet;
