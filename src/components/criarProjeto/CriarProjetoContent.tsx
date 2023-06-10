import React, { FormEvent, useContext, useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import styles from "./criarProjetoContent.module.scss";
import { Context } from "@/context/Context";
import { ClipLoader } from "react-spinners";
import { CheckCircle } from "phosphor-react";

export default function CriarProjetoContent() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [Error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const { addExperience } = useContext(Context);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // Faça o que desejar com os valores do formulário
    console.log("Nome do Projeto:", projectName);
    console.log("Descrição:", description);
    console.log("Contato:", contact);

    // Limpar os campos do formulário
    setProjectName("");
    setDescription("");
    setContact("");
    const data = null;

    try {
      setIsLoading(true);
      await addExperience(data);
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
    <div className={styles.wrapper}>
      <Dashboard />
      <div className={styles.painel}>
        <div className={styles.userContainer}>
          <h2>Crie um novo projeto</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.formsContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor='projectName'>Nome do Projeto:</label>
            <input
              type='text'
              id='projectName'
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='description'>Descrição:</label>
            <textarea
              id='description'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='contact'>Contato:</label>
            <input
              type='text'
              id='contact'
              value={contact}
              onChange={(event) => setContact(event.target.value)}
            />
          </div>
          <button type='submit'>Enviar</button>
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
    </div>
  );
}
