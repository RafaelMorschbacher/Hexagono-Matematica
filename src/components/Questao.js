import React from "react";
import styles from "../styles/components/Questao.module.css";

const Questao = ({
  id,
  imgPath,
  alternativas,
  num,
  minhasRespostas,
  setMinhasRespostas,
  ativo
}) => {
  function marcarAlternativa({ target }) {
    setMinhasRespostas({ ...minhasRespostas, [id]: target.value });
  }

  if(!ativo) return null
  return (
    <main className={styles.questaoContainer}>
      <header>{num}</header>
      <img src={imgPath} />
      <div className={styles.alternativasContainer}>
        {alternativas.map((alt) => {
          return (
            <label>
              {alt}
              <input type="checkbox" value={alt} checked={alt===minhasRespostas[id]} onChange={marcarAlternativa} />
            </label>
          );
        })}
      </div>
    </main>
  );
};

export default Questao;
