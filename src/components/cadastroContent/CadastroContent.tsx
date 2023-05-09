import React from "react";
import styles from "./cadastroContent.module.scss";

export default function CadastroContent() {
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <main className={styles.mainWrapper}>
      <div className={styles.mainContainer}>
        <h1>Cadastro</h1>
        <form>
          <input
            type='text'
            placeholder='Nome'
            alt='Campo de nome'
            required
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type='text'
            placeholder='Email'
            alt='Campo de email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Senha'
            alt='Campo de senha'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>CADASTRAR</button>
        </form>
      </div>
    </main>
  );
}
