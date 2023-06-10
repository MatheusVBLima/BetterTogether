import React, { useState } from "react";
import styles from "./cadastroContent.module.scss";
import { Context } from "@/context/Context";
import { ClipLoader } from "react-spinners";
import { CheckCircle } from "phosphor-react";

export default function CadastroContent() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [Error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

  const { signUp } = React.useContext(Context);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const data = {
      email,
      password,
      name,
    };
    try {
      setIsLoading(true);
      await signUp(data);
      setConfirm(true);
    } catch (error) {
      if (error.response && error.response.data) {
        const { message, details } = error.response.data;
        if (details) {
          const errorMessages = Object.entries(details)
            .map(([key, value]) => `${key}: ${value}`)
            .join("; ");
          setError(`Erro no envio de dados: ${errorMessages}`);
        } else if (message) {
          setError(message);
        } else {
          setError("Ocorreu um erro ao processar a solicitação.");
        }
      } else {
        setError("Ocorreu um erro ao processar a solicitação.");
      }
    } finally {
      setIsLoading(false);
    }
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
          {isLoading && (
            <ClipLoader
              color={"#f3bf22"}
              loading={isLoading}
              size={50}
              className={styles.spinner}
            />
          )}
          {confirm ? (
            <CheckCircle size={35} color='green' />
          ) : Error && !confirm ? (
            <p>{Error}</p>
          ) : null}
        </form>
      </div>
    </main>
  );
}
