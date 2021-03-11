import React from "react";
import styles from "../styles/components/Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <nav className={styles.navContainer}>
      <Link href="/">
        <a className={styles.logo}>
          <img src="/icons/hexagonoWhite.svg" alt="logo" />
          <h2>Hexagono</h2>
        </a>
      </Link>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        {" | "}
        <Link href="/provas">
          <a>Provas</a>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
