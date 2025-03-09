import React from 'react';
import styles from './transfer.module.scss';

const Transfer: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>Transfer Tokens</h2>
      <div className={styles.transferForm}>
        <input 
          type="text" 
          placeholder="Recipient Address"
          className={styles.addressInput}
        />
        <input 
          type="number" 
          placeholder="Amount"
          className={styles.amountInput}
        />
        <button className={styles.transferButton}>
          Transfer
        </button>
      </div>
    </div>
  );
};

export default Transfer;
