import React from "react";
import { Bar } from "react-chartjs-2";
import styles from "../styles/components/ComposicaoGrafico.module.css";

const ComposicaoGrafico = ({ questoesTotal, assuntos }) => {
  const colorPallete = [
    "#EC7063",
    "#F4D03F",
    "#5DADE2",
    "#BDC3C7",
    "#48C9B0",
    "#A569BD",
    "#58D68D",
    "#FF74E2",
    "#34495E",
    "#80DEEA",
    "#F39C12",
  ];

  const composicao = assuntos.reduce((acc, assunto) => {
    const numAssunto = questoesTotal.filter((q) => q.assuntos.includes(assunto))
      .length;
    return [].concat(acc, numAssunto);
  }, []);

  const chartData = {
    labels: assuntos,
    datasets: [
      {
        label: "Número de questões",
        data: composicao,
        backgroundColor: colorPallete,
      },
    ],
    options: {
      responsive: true,
    },
  };

  return (
    <>
      <div className={styles.titleDiv}>
        <img className={styles.icon} src="/icons/HexagonoPurpleFill.svg" />
        <span className={styles.title}>Composição da Prova</span>
      </div>{" "}
      <div className={styles.composicaoContainer}>
        <Bar data={chartData} />
      </div>
    </>
  );
};

export default ComposicaoGrafico;
