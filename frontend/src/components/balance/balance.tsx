import React from 'react';
import styles from './balance.module.scss';

const Balance: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>Token Balance</h2>
      <div className={styles.balanceDisplay}>
        <p>Current Balance: 0 TOKEN</p>
      </div>
    </div>
  );
};

export default Balance;
