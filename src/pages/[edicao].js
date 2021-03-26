import styles from '../styles/edicao.module.css'
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Feedback from "../components/Feedback";
import Header from "../components/Header";
import Navegacao from "../components/Navegacao";
import Questao from "../components/Questao";

import firebase from "../others/firebase";


export const getStaticPaths = async () => {
  const response = await firebase
    .firestore()
    .collection("info")
    .doc("disponiveis")
    .get();
  const disponiveis = response.data();
  const paths = disponiveis.edicoes.map((edicao) => {
    return {
      params: { edicao },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {

  const questoesResp = await firebase
    .firestore()
    .collection("provas")
    .doc(params.edicao)
    .collection("questoes")
    .get();

    const questoesDesorg = questoesResp.docs.map((questao)=> questao.data())
    const questoes = questoesDesorg.sort((a,b)=> a.num-b.num)    

    const dadosResp =await firebase.firestore()
    .collection("provas")
    .doc(params.edicao)
    .get();


    const idProva = dadosResp.data().idProva
    const idEdicao = params.edicao
    const opcoes = dadosResp.data().alternativas

    
    const dadosResp2 = await firebase.firestore().collection('info').doc('disponiveis').collection('provas').doc(idProva).get()
    const dados = dadosResp2.data()

    

    return {
        props: { selecionada:dados,questoes,idEdicao, opcoes }
    }
};

const edicao = ({selecionada,questoes,idEdicao,opcoes}) => {

    const [minhasRespostas, setMinhasRespostas] = React.useState(
        questoes.reduce((acc, prox) => {
          return { ...acc, [prox.num]: "" };
        }, {})
      );
      const [slide, setSlide] = React.useState(0); //Navegação  pelas questões
      const [ultimaQuest, setUltimaQuest] = React.useState(false);
    
      React.useEffect(() => {
        if (slide === questoes.length - 1) setUltimaQuest(true);
        else setUltimaQuest(false);
      }, [slide]);
    
      function proximaQuestao() {
        if (slide < questoes.length - 1) setSlide(slide + 1);
      }
      function anteriorQuestao() {
        if (slide > 0) {
          setSlide(slide - 1);
        }
      }
    
      const [isFinished, setIsFinished] = React.useState(false);
    
      const [acertos, setAcertos] = React.useState([]);
    
      function finalizarProva() {
        const corretas = questoes.filter(
          (questao) => questao.gabarito === minhasRespostas[questao.num]
        );
        const acertosSorted = corretas.sort((a, b) => a.num - b.num);
        setAcertos(acertosSorted);
        setIsFinished(true);
      }
    
      return (
        <>
          <Head>
            <title>
              Hexagono | {idEdicao}
            </title>
          </Head>
          <Header />
          <section className={styles.containerTotal}>
            <Link href={`/provas/${selecionada.id}`}>
              <button className={styles.voltarButton}>Sair</button>
            </Link>
            {selecionada && <div className={styles.universidadeInfo}>
              <img src={`/icons/${selecionada.id}.png`} alt="fotoUniversidade" />
              <h2>
                {idEdicao}
              </h2>
            </div>}
            {!isFinished && questoes && (
              <>
                <Navegacao
                  questoes={questoes}
                  slide={slide}
                  setSlide={setSlide}
                  minhasRespostas={minhasRespostas}
                />
                <div className={styles.navegarButtons}>
                  <button onClick={anteriorQuestao}>Anterior</button>
                  {!ultimaQuest && (
                    <button onClick={proximaQuestao}>Próxima</button>
                  )}
                  {ultimaQuest && (
                    <button
                      className={styles.ultimaQuestaoButton}
                      onClick={finalizarProva}
                    >
                      Finalizar Prova
                    </button>
                  )}
                </div>
                {questoes.map((questao, index) => {
                  return (
                    <Questao
                    key={questao.num}
                      {...questao}
                      opcoes = {opcoes}
                      minhasRespostas={minhasRespostas}
                      setMinhasRespostas={setMinhasRespostas}
                      ativo={index === slide}
                      idEdicao={idEdicao}
                    />
                  );
                })}
              </>
            )}
            {isFinished && <Feedback acertos={acertos} questoesTotal={questoes} />}
          </section>
        </>
      );
};

export default edicao;
