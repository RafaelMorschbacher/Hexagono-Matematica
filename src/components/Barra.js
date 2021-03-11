import React from "react";
import styles from "../styles/components/Barra.module.css";

const Barra = ({ materia, porcentagem }) => {
  let color;
  if (porcentagem >= 70) {
    color = "#00FF85";
  } else if (porcentagem >= 45) {
    color = "#FFE600";
  } else {
    color = "#FF505A";
  }
  
  return (
    <div className={styles.containerBarrinha}>
      <p>{materia}</p>
      <div className={styles.barrinhaTotal}>
        <div
          className={styles.barrinhaProgresso}
          style={{ width: `${porcentagem}%`,background: color }}
        />
        <span style={{ left: `${porcentagem}%` }}>{porcentagem}%</span>
      </div>
    </div>
  );
};

export default Barra;
