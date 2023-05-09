import React from "react";
import styles from "./loginContent.module.scss";
import Link from "next/link";

export default function CadastroContent() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <main className={styles.mainWrapper}>
      <div className={styles.mainContainer}>
        <h1>Login</h1>
        <form>
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
          <button type='submit'>ENTRAR</button>
          <Link href='/recuperar'>Esqueci a Senha</Link>
        </form>
      </div>
    </main>
  );
}
