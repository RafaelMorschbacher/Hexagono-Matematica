import React from "react";
import styles from "../styles/components/ComposicaoMobile.module.css";
const ComposicaoMobile = ({ assuntos, questoesTotal }) => {
  const composicao = assuntos.reduce((acc, assunto) => {
    const numAssunto = questoesTotal.filter((q) => q.assuntos.includes(assunto))
      .length;
    return { ...acc, [assunto]: numAssunto };
  }, {});

  const cores = assuntos.reduce((acc, assunto) => {
    const corAleatoria =
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6); // Cor aleatoria
    return { ...acc, [assunto]: corAleatoria };
  }, {});

  return (
    <>
      <div className={styles.titleDiv}>
        <img className={styles.icon} src="/icons/HexagonoPurpleFill.svg" />
        <span className={styles.title}>Composição da Prova</span>
        <p>Em número de questões</p>
      </div>
      <ul className={styles.lista}>
        {assuntos.map((assunto) => (
          <li key={assunto}>
            <img src="/icons/HexagonoGrayFill.svg" />
            {assunto}: <strong> {composicao[assunto]}</strong>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ComposicaoMobile;
