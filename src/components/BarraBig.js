import React from 'react'
import styles from '../styles/components/BarraBig.module.css'

const BarraBig = ({porcentagem}) => {
  let color;
  if (porcentagem >= 70) {
    color = "#00FF85";
  } else if (porcentagem >= 45) {
    color = "#FFE600";
  } else {
    color = "#FF505A";
  }
  let texto
  if(porcentagem==100){
    texto = 'Você gabaritou a prova, parabéns! Agora é apenas manter o nível e revisar.'
  }
  else if(porcentagem>=90){
    texto = 'Você obteve um resultado praticamente perfeito, continue assim!'
  }else if(porcentagem>=70){
    texto = 'Você obteve um resultado acima da média, falta pouco para chegar ao topo! Dê uma olhadinha nas outras provas disponíveis e bora evoluir!'
  }else if(porcentagem>=50){
    texto='Você está próximo da média, o que significa que ainda há espaço pra se destacar! Bora revisar o que fez falta nessa prova? Ah, e não deixe de dar uma olhadinha nas outras provas disponíveis, te vejo lá!'
  }else if(porcentagem>=30){
    texto='Seu resultado foi baixo, mas não desanima não! Revise bem o que te fez falta nessa prova e dê aquela pesquisada no youtube pra aprender mais a fundo. Volte aqui em algum tempo, você vai ficar impressionado com o tanto que evoluiu.'
  }else{
    texto='Calma, é normal não ir bem, anormal é desistir! Tá na hora de estudar e, aos poucos, construir bem cada um dos conteúdos. Não desanima não, eu acredito em você!'
  }
    return (
        <div className={styles.resultadoGeral}>
        <p>Geral</p>
        <div className={styles.barraTotal}>
          <div
            className={styles.barraProgresso}
            style={{ width: `${porcentagem}%`,background:color }}
          />
          <span style={{ left: `${porcentagem}%` }}>{porcentagem}%</span>
        </div>
        <span className={styles.texto}>{texto}</span>
      </div>
    )
}

export default BarraBig
