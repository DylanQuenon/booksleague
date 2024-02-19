// Navbar component
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";

export default function NavBar() {
  const [open, setOpen] = useState(false); // pour vérifier le menu burger
  const [scrollProgress, setScrollProgress] = useState(0); // la progression du scroll

  const headerRef = useRef(null); //on va selectionner le header

  const progressbarRef = useRef(null);//on va selectionner la barre de progression 

  const handleMenuClick = () => {
    setOpen(!open); // il est fermé de base
  };

  const handleLinkClick = () => {
    setOpen(false); // Ferme le menu lorsqu'un lien est cliqué
  };

  useEffect(() => {
    const header = headerRef.current;
    const progressbar = progressbarRef.current;
    const lastScrollValue = { current: 0 }; // valeur par défaut 0
    const burger = document.getElementById(styles.burger);

    const handleScroll = () => { // au scroll
      const top = document.documentElement.scrollTop; // on va chercher le scroll top
      if (lastScrollValue.current < top) { //on vient vérifier si on descend au scroll ou si on remonte
        header.classList.add(styles.hide); // on adapte les classes en fonction
        header.classList.remove(styles.show);
        burger.classList.add(styles.hide);
        burger.classList.remove(styles.show);
      } else {
        header.classList.remove(styles.hide);
        header.classList.add(styles.show);
        burger.classList.remove(styles.hide);
        burger.classList.add(styles.show);
      }
      lastScrollValue.current = top;

      // Calculer la progression de la barre
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const progressWidth = (top / documentHeight) * 100;
      setScrollProgress(progressWidth);
      progressbar.style.width = `${scrollProgress}%`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollProgress]);

  return (
    <>
      <header ref={headerRef} className={`${styles.navbar} ${styles.show}`}>
        <nav>
          <ul>
            <li>

              <Link href="/" onClick={handleLinkClick}>
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/presentation" onClick={handleLinkClick}>
                Présentation
              </Link>
            </li>
            <li>
              <Link href="/books" onClick={handleLinkClick}>
                Livres
              </Link>
            </li>
            <li>

              <Link href="/contact" onClick={handleLinkClick}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div
        id={styles.burger}
        className={`${open ? styles.openBurger : ""} ${ // si il est ouvert il prend la css du menu ouvert et si il est ouvert on fait la rotation  de la croix
          open ? styles.rotate180 : ""
          }`}
        onClick={handleMenuClick}
      >
        <div
          className={`${styles.bar} ${open ? styles.openBurger1 : ""}`}
        ></div>
        <div
          className={`${styles.bar} ${open ? styles.openBurger2 : ""}`}
        ></div>
        <div
          className={`${styles.bar} ${open ? styles.openBurger3 : ""}`}
        ></div>
      </div>

      <div
        ref={progressbarRef}
        id={styles.progressbar}
        style={{ width: `${scrollProgress}%` }} // la barre de progression
      ></div>

      <div
        id={styles.menuMobile}
        className={`${styles.menuMobile} ${open ? styles.openMenu : ""}`}
      >
        <nav>
          <ul>
            <li>
              <Link href="/" onClick={handleLinkClick}>
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/presentation" onClick={handleLinkClick}>
                Présentation
              </Link>
            </li>
            <li>
              <Link href="/books" onClick={handleLinkClick}>
                Livres
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={handleLinkClick}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
