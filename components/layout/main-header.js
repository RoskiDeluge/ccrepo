import Link from 'next/link';
import styles from './main-header.module.css';
import React from 'react';

export default function MainHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Casa Cards</Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href="/cards">Browse All Cards</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
