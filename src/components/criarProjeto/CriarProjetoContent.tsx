import React from "react";
import Dashboard from "../dashboard/Dashboard";
import styles from "./criarProjetoContent.module.scss";

export default function CriarProjetoContent() {
  return (
    <div className={styles.wrapper}>
      <Dashboard />
      <div className={styles.painel}>
        <div className={styles.userContainer}>
          <h2>Crie um novo projeto</h2>
        </div>
        <div className={styles.formsContainer}>
          <input type='text' />
          <input type='text' />
          <input type='text' />
          <input type='text' />
        </div>
      </div>
    </div>
  );
}
