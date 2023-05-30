import React from "react";
import styles from "./cadastroContent.module.scss";
import { AuthContext } from "@/context/Context";

export default function CadastroContent() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signUp } = React.useContext(AuthContext);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const data = {
      email,
      password,
      name,
    };
    await signUp(data);
  }

  return (
    <main className={styles.mainWrapper}>
      <div className={styles.mainContainer}>
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Nome'
            alt='Campo de nome'
            required
            onChange={(e) => setName(e.target.value)}
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
