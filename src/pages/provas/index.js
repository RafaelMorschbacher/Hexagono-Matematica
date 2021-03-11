import Head from "next/head";
import React from "react";
import Header from "../../components/Header";
import universidades from "../../../universidades.json";
import styles from "../../styles/provas.module.css";
import Link from "next/link";

const index = () => {
  return (
    <>
      <Head>
        <title>Hexagono | Provas</title>
      </Head>
      <Header />
      <section className={styles.pageContainer}>
        <div className={styles.titleContainer}>
          <img src="icons/hexagonoPurple.svg" alt="" />
          <span>Onde você quer ingressar?</span>
          <p>Escolha seu vestibular</p>
        </div>

        <div className={styles.provasContainer}>
          {universidades.map((uni) => {
            return (
              <Link href={`provas/${uni.id}`}>
                <div className={styles.provaUnidade}>
                  <img src={`icons/${uni.id}.png`} alt="" />
                  <p>{uni.nome}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default index;
