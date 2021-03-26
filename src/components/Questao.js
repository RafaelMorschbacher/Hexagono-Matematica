import React from "react";
import styles from "../styles/components/Questao.module.css";

const Questao = ({
  alternativas,
  num,
  idEdicao,
  minhasRespostas,
  setMinhasRespostas,
  ativo,
  opcoes
}) => {
  function marcarAlternativa({ target }) {
    setMinhasRespostas({ ...minhasRespostas, [num]: target.value });
  }

  if(!ativo) return null
  return (
    <main className={styles.questaoContainer}>
      <header>{num}</header>
      <img src={`/provas/${idEdicao}/${num}.png`} />
      <div className={styles.alternativasContainer}>
        {opcoes.map((alt) => {
          return (
            <label key={alt}>
              {alt}
              <input type="checkbox" value={alt} checked={alt===minhasRespostas[num]} onChange={marcarAlternativa} />
            </label>
          );
        })}
      </div>
    </main>
  );
};

export default Questao;
