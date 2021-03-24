import React from "react";
import styles from "../styles/components/Header.module.css";
import Link from "next/link";
import { UserContext } from "../contexts/userContext";
import { useRouter } from "next/router";

const Header = () => {
  const { user, logOut } = React.useContext(UserContext);
  const router = useRouter();

  function sair() {
    logOut();
    router.push("/");
  }

  return (
    <nav className={styles.navContainer}>
      <Link href="/">
        <a className={styles.logo}>
          <img src="/icons/hexagonoWhiteThin.svg" alt="logo" />
          <h2>Hexagono</h2>
        </a>
      </Link>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        {" | "}
        {user ? (
          <>
            <Link href="/provas">
              <a>Provas</a>
            </Link>
            {" | "} <span onClick={sair}>Sair</span>
          </>
        ) : (
          <Link href="/login">
            <a>Entrar</a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
