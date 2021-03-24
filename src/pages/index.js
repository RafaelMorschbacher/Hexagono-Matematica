import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import React from "react";
import { UserContext } from "../contexts/userContext";

export default function Home() {
  const { user, userName } = React.useContext(UserContext);

  return (
    <>
      <Head>
        <title>Home | Hexagono</title>
      </Head>
      <Header />
      {!user && (
        <div className={styles.homeContainer}>
          <div className={styles.titlesContainer}>
            <p>
              Pratique matemática com <br />
              <strong>provas reais</strong>
            </p>
            <p>
              Receba feedback <br />
              <strong>instantâneo</strong>
            </p>
          </div>
          <div className={styles.imagesContainer}>
            <img src="/illustrations/study.svg" alt="" />
            <img src="/illustrations/feedback3.svg" alt="" />
          </div>
          <div className={styles.infoButtonContainer}>
            <Link href="/signin">
              <button className={styles.startButton}>Começar</button>
            </Link>
            <div>
              <h4>Quem somos?</h4>
              <p>
                Uma plataforma na qual você pode praticar <strong>Matemática</strong> através
                de <strong>provas anteriores</strong> dos maiores vestibulares
                do país. Tudo isso pra te deixar mais próximo do{" "}
                <strong>seu objetivo</strong>
              </p>
            </div>
          </div>
        </div>
      )}
      {user && (
        <div className={styles.homeContainer}>
          <div className={styles.titlesContainer}>
            <p>
              Oi, {userName}!<br />
              <strong>Bora praticar?</strong>
            </p>
            <p>
              Hora de focar nos <br />
              <strong>seus objetivos!</strong>
            </p>
          </div>
          <div className={styles.imagesContainer}>
            <img src="/illustrations/math.svg" alt="" />
            <img src="/illustrations/learning.svg" alt="" />
          </div>
          <div className={styles.infoButtonContainer}>
            <Link href="/provas">
              <button className={styles.startButton}>Vamos lá!</button>
            </Link>
            <div>
              <h4>Quem somos?</h4>
              <p>
                Uma plataforma na qual você pode praticar <strong>Matemática</strong> através
                de <strong>provas anteriores</strong> dos maiores vestibulares
                do país. Tudo isso pra te deixar mais próximo do{" "}
                <strong>seu objetivo</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );

}
