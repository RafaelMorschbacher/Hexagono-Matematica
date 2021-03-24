import React from "react";
import styles from "../styles/components/Estudar.module.css";

const Estudar = ({ assuntos, resultados }) => {
  const oQueEstudar = [];
  assuntos.forEach((assunto) => {
    if (resultados[assunto] <= 50) oQueEstudar.push(assunto);
  });

  return (
    <div>
      <div className={styles.titleDiv}>
        <img src="/icons/HexagonoPurpleFill.svg" alt="" />
        <span>E agora, o que estudar?</span>
        <p>O que você deve reforçar daqui pra frente</p>
      </div>
      <div className={styles.listaContainer}>
        <ul className={styles.lista}>
          {oQueEstudar.map((materia) => (
            <li key={materia} className={styles.itemMateria}>
              <img src="/icons/HexagonoPurpleFill.svg" />
              {materia}
            </li>
          ))}
        </ul>
        <img src="/illustrations/whatToStudy.svg" />
      </div>
    </div>
  );
};

export default Estudar;
