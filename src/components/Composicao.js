import React from "react";
import styles from "../styles/components/Composicao.module.css";

const Composicao = ({ questoes, assuntos }) => {
  const composicao = assuntos.reduce((acc, assunto) => {
    const numAssunto = questoes.filter((q) => q.assuntos.includes(assunto))
      .length;
    return {
      ...acc,
      [assunto]: numAssunto,
    };
  }, {});

  return (
    <>
    <img className={styles.icon} src="/icons/HexagonoPurple.svg"/>
      <span className={styles.title}>Qual é a composição da prova?</span>
      <div className={styles.composicaoContainer}>
        {assuntos.map((assunto) => {
          return (
            <div>
              <p>{assunto}</p>
              <span>{composicao[assunto]} {composicao[assunto]>1? 'questoes': 'questão'}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Composicao;
