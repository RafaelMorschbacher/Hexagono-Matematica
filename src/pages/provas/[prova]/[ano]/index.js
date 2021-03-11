import { useRouter } from "next/router";
import Head from 'next/head'
import React from "react";
import Header from "../../../../components/Header";
import Link from 'next/link'
import styles from "../../../../styles/ano.module.css";
import universidades from "../../../../../universidades.json";
import Questao from "../../../../components/Questao";
import firebase from "../../../../others/firebase";
import Feedback from "../../../../components/Feedback";

const Ano = () => {
  const { ano, prova } = useRouter().query;

  const [questoes, setQuestoes] = React.useState([]);
  const selecionada = universidades.filter((uni) => uni.id === prova)[0];

  React.useEffect(() => {
    async function getProva() {
      //Puxando dados do FIRESTORE
      const provaAtualID = `${prova}${ano}`;
      const fireGET = await firebase.firestore().collection(provaAtualID).get();
      const provaArray = fireGET.docs.map((doc) => doc.data()); //Transformando a resposta do firebase no array de documentos
      const provaOrdenada = provaArray.sort((a, b) => a.num - b.num); // Ordenando as questões
      setQuestoes(provaOrdenada);
    }
    getProva();
  }, []);

  const [minhasRespostas, setMinhasRespostas] = React.useState(
    questoes.reduce((acc, prox) => {
      return { ...acc, [prox.id]: "" };
    }, {})
  );
  const [slide, setSlide] = React.useState(23); //Navegação  pelas questões
  const [ultimaQuest, setUltimaQuest] = React.useState(false);

  function proximaQuestao() {
    if (slide < questoes.length - 1) setSlide(slide + 1);
    if (slide === questoes.length - 2) setUltimaQuest(true);
  }
  function anteriorQuestao() {
    if (slide > 0) {
      setSlide(slide - 1);
      setUltimaQuest(false);
    }
  }

  const [isFinished, setIsFinished] = React.useState(false);

  const [acertos, setAcertos] = React.useState([]);

  function finalizarProva() {
    const corretas = questoes.filter(
      (questao) => questao.gabarito === minhasRespostas[questao.id]
    );
    const acertosSorted = corretas.sort((a, b) => a.num - b.num);
    setAcertos(acertosSorted);
    setIsFinished(true);
  }

  return (
    <>
      <Head>
        <title>Hexagono | {prova}{ano}</title>
      </Head>
      <Header />
      <section className={styles.containerTotal}>
      <Link href={`/provas/${selecionada.id}`}>
          <button className={styles.voltarButton}>Sair</button>
        </Link>
      <div className={styles.universidadeInfo}>
        <img src={`/icons/${selecionada.id}.png`} alt="fotoUniversidade" />
        <h2>
          {selecionada.nome} {ano}
        </h2>
      </div>
      {!isFinished && (
        <>
          {questoes.map((questao, index) => {
            return (
              <Questao
                {...questao}
                minhasRespostas={minhasRespostas}
                setMinhasRespostas={setMinhasRespostas}
                ativo={index === slide}
              />
            );
          })}
          <div className={styles.navegarButtons}>
            <button onClick={anteriorQuestao}>Anterior</button>
            {!ultimaQuest && <button onClick={proximaQuestao}>Próxima</button>}
            {ultimaQuest && (
              <button
                className={styles.ultimaQuestaoButton}
                onClick={finalizarProva}
              >
                Finalizar Prova
              </button>
            )}
          </div>
        </>
      )}
      {isFinished && (
        <Feedback acertos={acertos} questoesTotal={questoes} />
      )}
      </section>
    </>
  );
};

export default Ano;
