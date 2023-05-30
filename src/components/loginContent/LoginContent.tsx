import React from "react";
import styles from "./loginContent.module.scss";
import Link from "next/link";
import { Context } from "@/context/Context";

export default function CadastroContent() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn } = React.useContext(Context);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    await signIn(data);
  }

  return (
    <main className={styles.mainWrapper}>
      <div className={styles.mainContainer}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
