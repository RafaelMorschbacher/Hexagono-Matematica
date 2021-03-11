import React from "react";
import styles from "../styles/components/Feedback.module.css";
import Barra from "./Barra";
import BarraBig from "./BarraBig";
import Composicao from "./Composicao";

const Feedback = ({ acertos, questoesTotal }) => {
  const porcentGeral = Math.floor(
    (acertos.length / questoesTotal.length) * 100
  );

  const AssuntosSet = new Set();
  const arraysAssuntos = questoesTotal.map((questao) => questao.assuntos); // Fazendo um array de arrays de assunto
  const assuntosComRepeticao = arraysAssuntos.reduce((acc, it) =>
    [].concat(acc, it)
  ); //Juntando esses arrays em um só
  assuntosComRepeticao.forEach((assunto) => AssuntosSet.add(assunto)); // Colocando cada item no Set para evitar repetições
  const assuntos = [...AssuntosSet]; // transformando o Set em array novamente, sem repetições e pronto para uso

  const resultados = assuntos.reduce((acc, assunto) => { // Gerando, a partir da Lista de Assuntos, um objeto com a divisão do número de acertos pelo número total de cada assunto através de 2 filters
    const totalAssunto = questoesTotal.filter((q) =>
      q.assuntos.includes(assunto)
    );
    const acertosAssunto = acertos.filter((q) => q.assuntos.includes(assunto));
    return {
      ...acc,
      [assunto]: Number(Math.floor((acertosAssunto.length / totalAssunto.length)*100)),
    };
  }, {});
  

  return (
    <div className={styles.feedbackContainer}>
      <header className={styles.titleContainer}>
        <img src="/icons/HexagonoPurple.svg" />
        <span>Seus Resultados</span>
        <p>Parabéns por chegar até aqui!</p>
      </header>
      <BarraBig porcentagem={porcentGeral} />
      <div className={styles.resultadosEspecificos}>
        {assuntos.map((assunto)=> <Barra materia={assunto} porcentagem={resultados[assunto]}/>)}
      </div>
      <Composicao questoes={questoesTotal} assuntos={assuntos}/> 
    </div>
  );
};

export default Feedback;
