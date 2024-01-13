'use client'
import { useState } from 'react';
import Link from 'next/link';
import styles from './navbar.module.scss';

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const handleMenuClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <header className={styles.navbar}>
        <nav>
          <ul>
            <li>
              <Link href="/">Accueil</Link>
            </li>
            <li>
              <Link href="/presentation">Présentation</Link>
            </li>
            <li>
              <Link href="/books">Livres</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div
        id={styles.burger}
        className={`${open ? styles.openBurger : ''} ${open ? styles.rotate180 : ''}`}
        onClick={handleMenuClick}
      >
        <div className={`${styles.bar} ${open ? styles.openBurger1 : ''}`}></div>
        <div className={`${styles.bar} ${open ? styles.openBurger2 : ''}`}></div>
        <div className={`${styles.bar} ${open ? styles.openBurger3 : ''}`}></div>
      </div>

      <div id={styles.menuMobile} className={`${styles.menuMobile} ${open ? styles.openMenu : ''}`}>
        <nav>
          <ul>
            <li>
              <Link href="/">Accueil</Link>
            </li>
            <li>
              <Link href="/presentation">Présentation</Link>
            </li>
            <li>
              <Link href="/books">Livres</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
