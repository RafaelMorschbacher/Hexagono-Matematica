import React from "react";
import Header from "../../../components/Header.js";
import styles from "../../../styles/prova.module.css";
import firebase from "../../../others/firebase";
import Link from "next/link";
import Head from "next/head";

export const getStaticPaths = async () => {
  const response = await firebase
    .firestore()
    .collection("info")
    .doc("disponiveis")
    .collection("provas")
    .get();
  const arrayDocs = response.docs.map((doc) => doc.data());
  const paths = arrayDocs.map((doc) => {
    return { params: { prova: doc.id } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const response = await firebase
    .firestore()
    .collection("info")
    .doc("disponiveis")
    .collection("provas")
    .doc(params.prova)
    .get();
  const selecionada = response.data();
  return {
    props: { selecionada },
  };
};

const index = ({ selecionada }) => {
  return (
    <>
      <Head>
        <title>Hexagono | {selecionada.nome}</title>
      </Head>
      <Header />
      <div className={styles.containerTotal}>
        <Link href="/provas">
          <button className={styles.voltarButton}>Voltar</button>
        </Link>
        {selecionada && (
          <div className={styles.mainContainer}>
            <section className={styles.faculdade}>
              <div>
                <img src="/icons/hexagonoPurpleFill.svg" alt="" />
                <span>{selecionada.nome}</span>
                <p>Selecione a edição</p>
              </div>
              <img src={`/icons/${selecionada.id}.png`} alt="" />
            </section>
            <section className={styles.anos}>
              {selecionada.anos.map((ano) => (
                <Link href={`/${selecionada.id}${ano}`} key={ano}>
                  <div>{ano}</div>
                </Link>
              ))}
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default index;
