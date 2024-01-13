// Navbar component
'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './navbar.module.scss';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleMenuClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const header = document.querySelector(`.${styles.navbar}`);
    const progressbar = document.getElementById(styles.progressbar);
    const lastScrollValue = { current: 0 };

    const handleScroll = () => {
      const top = document.documentElement.scrollTop;
      if (lastScrollValue.current < top) {
        header.classList.add(styles.hide);
        header.classList.remove(styles.show);
      } else {
        header.classList.remove(styles.hide);
        header.classList.add(styles.show);
      }
      lastScrollValue.current = top;

      //calculer la progression de la barre
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progressWidth = (top / documentHeight) * 100;
      setScrollProgress(progressWidth);
      progressbar.style.width = `${scrollProgress}%`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`${styles.navbar} ${styles.show}`}>
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

      <div id={styles.progressbar} style={{ width: `${scrollProgress}%` }}></div>

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
