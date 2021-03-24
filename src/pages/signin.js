import React from "react";
import Header from "../components/Header";
import styles from "../styles/signin.module.css";
import { UserContext } from "../contexts/userContext";
import Link from "next/link";
import Head from "next/head";

const index = () => {
  const { user, signIn , erro, setErro } = React.useContext(UserContext);

  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [apelido, setApelido] = React.useState("");
 
  React.useEffect(()=>setErro(null),[]) // Resetando erro, para não levar de uma page para outra

  function handleSubmit(e) {
    e.preventDefault();
    signIn(email, senha, apelido);
    setEmail("");
    setSenha("");
    setApelido("");
  }

  return (
    <>
      <Head>
        <title>Cadastro | Hexagono</title>
      </Head>
      <Header />
      <h2 className={styles.title}>Cadastre-se</h2>
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

            <label>
              Apelido
              <input
                type="text"
                value={apelido}
                onChange={({ target }) => setApelido(target.value)}
              />
            </label>
            <button className={styles.criarButton} onClick={handleSubmit}>
              Criar
            </button>
            {erro && <p className={styles.erro}>{erro}</p>}
          </form>
          <div className={styles.textoEntrar}>
            <span>Já é cadastrado? </span>
            <Link href="/login">
              <strong className={styles.entrarClick}>Entrar</strong>
            </Link>
          </div>
        </div>

        <img src="/illustrations/signin.svg" alt="" />
      </div>
    </>
  );
};

export default index;
