import React from "react";
import Dashboard from "../dashboard/Dashboard";
import styles from "./meusProjetosContent.module.scss";

export default function MeusProjetosContent() {
  return (
    <div className={styles.wrapper}>
      <Dashboard />
      <div className={styles.painel}>
        <div className={styles.userContainer}>
          <h2>Meus Projetos</h2>
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
