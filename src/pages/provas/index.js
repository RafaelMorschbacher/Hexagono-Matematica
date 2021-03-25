import Head from "next/head";
import React from "react";
import Header from "../../components/Header";
import firebase from "../../others/firebase";
import styles from "../../styles/provas.module.css";
import Link from "next/link";

export const getStaticProps = async () => {
  const response = await firebase
    .firestore()
    .collection("info")
    .doc("disponiveis")
    .collection("provas")
    .get();
  const lista = response.docs.map((item) => item.data());
  return {
    props: { universidades: lista },
  };
};

const index = ({ universidades }) => {
  return (
    <>
      <Head>
        <title>Hexagono | Provas</title>
      </Head>
      <Header />
      <section className={styles.pageContainer}>
        <div className={styles.titleContainer}>
          <img src="icons/hexagonoPurple.svg" alt="" />
          <span>Para onde vamos?</span>
          <p>Escolha sua prova</p>
        </div>

        <div className={styles.provasContainer}>
          {universidades &&
            universidades.map((uni) => {
              return (
                <Link href={`provas/${uni.id}`} key={uni.id}>
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
