import Link from 'next/link';
import React from 'react'
import Header from '../components/Header'
import { UserContext } from '../contexts/userContext';
import styles from '../styles/login.module.css'
import {useRouter} from 'next/router'
import Head from 'next/head'

const index = () => {
    const { user, logIn, erro,setErro } = React.useContext(UserContext);

  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const router = useRouter()

  React.useEffect(()=>setErro(null),[]) // Resetando erro, para não levar de uma page para outra

  function entrar(e){
    e.preventDefault()
    logIn(email,senha)
    setEmail('')
    setSenha('')
  }

  return (
      <>
      <Head>
        <title>Login | Hexagono</title>
      </Head>
        <Header />
        <h2 className={styles.title}>Entrar</h2>
        <div className={styles.containerGeral}>
          <div>
            <form className={styles.form}>
              <label>
                Email
                <input
                  type="text"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
              </label>

              <label>
                Senha
                <input
                  type="password"
                  value={senha}
                  onChange={({ target }) => setSenha(target.value)}
                />
              </label>
              <button className={styles.loginButton} onClick={entrar}>Entrar</button>
              {erro && <p className={styles.erro}>{erro}</p>}
            </form>
            <div className={styles.textoEntrar}>
              <span >Não é cadastrado? </span>
            <Link href='/signin'><strong className={styles.entrarClick}>Criar Conta</strong></Link>
            </div>
            
          </div>

          <img src="/illustrations/reading.svg" alt="" />
        </div>
      </>
    );
}

export default index
