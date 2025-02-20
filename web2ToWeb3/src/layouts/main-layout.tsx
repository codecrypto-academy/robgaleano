import { ReactNode } from 'react';

import Header from '../components/header/header';
import styles from './main-layout.module.scss';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        {/* Your footer content */}
      </footer>
    </div>
  );
};

export default MainLayout;
