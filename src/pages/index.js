import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Hexagono</title>
      </Head>
      <Header />
      <section className={styles.home}>
        <div className={styles.Adverstisement}>
          <img src="illustrations/study.svg" alt="" />
          <div>
            <p>Faça provas anteriores,</p>
            <p>chegue mais preparado</p>
          </div>
        </div>
        <div className={`${styles.Adverstisement} ${styles.secondAd}`}>
          <div>
            <p>Com feedback</p>
            <p>instantâneo</p>
          </div>
          <img src="illustrations/feedback.svg" alt="" />
        </div>
        <Link href='/provas'><button className={styles.startButton}>Começar</button></Link>
        
      </section>
    </>
  );
}
