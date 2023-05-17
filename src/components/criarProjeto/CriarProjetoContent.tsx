import React, { useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import styles from "./criarProjetoContent.module.scss";

export default function CriarProjetoContent() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Faça o que desejar com os valores do formulário
    console.log("Nome do Projeto:", projectName);
    console.log("Descrição:", description);
    console.log("Contato:", contact);

    // Limpar os campos do formulário
    setProjectName("");
    setDescription("");
    setContact("");
  };
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
        </form>
      </div>
    </div>
  );
}
