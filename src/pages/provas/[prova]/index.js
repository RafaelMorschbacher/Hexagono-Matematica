import React from "react";
import Header from "../../../components/Header.js";
import styles from "../../../styles/prova.module.css";
import { useRouter } from "next/router";
import universidades from "../../../../universidades.json";
import Link from "next/link";
import Head from 'next/head'

const index = () => {
  const { prova } = useRouter().query;
  const selecionada = universidades.filter((uni) => uni.id === prova)[0];

  return (
    <>
    <Head>
      <title>Hexagono | {prova}</title>
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
                  <img src="/icons/hexagonoPurple.svg" alt=""/>
                <span>{selecionada.nome}</span>
                <p>Selecione a edição</p>
              </div>
              <img src={`/icons/${selecionada.id}.png`} alt="" />
            </section>
            <section className={styles.anos}>
              {selecionada.anos.map((ano) => (
                <Link href={`/provas/${selecionada.id}/${ano}`}><div>{ano}</div></Link>
              ))}
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default index;
