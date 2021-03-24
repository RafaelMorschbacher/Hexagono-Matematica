import React from "react";
import styles from "../styles/components/Navegacao.module.css";

const Navegacao = ({ questoes, setSlide, minhasRespostas, slide }) => {
  function navegar({ target }) {
    setSlide(target.id - 1);
  }
  function feito(q) {
    if (minhasRespostas[q.id]) return true; // Se houver resposta para a questão, retornar true (feito)
  }
  function atual(q) {
    // Se o slide estiver na questão, retorna true (atual)
    if (slide === q.num - 1) return true;
  }

  return (
    <nav className={styles.navegacaoContainer}>
      {questoes.map((q) => {
        return (
          <div
            key={q.id}
            id={q.num}
            className={`${styles.questaoItem} ${feito(q) ? styles.feito : ""} ${
              atual(q) ? styles.atual : ""
            }`} // Sistema de classes com classe base para todos, uma para feitos e uma para a questão atual
            onClick={navegar}
          >
            {q.num}
          </div>
        );
      })}
    </nav>
  );
};

export default Navegacao;
