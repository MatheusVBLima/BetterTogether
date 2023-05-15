import React from "react";
import Dashboard from "../dashboard/Dashboard";
import styles from "./perfilContent.module.scss";

export default function PerfilContent() {
  return (
    <div className={styles.wrapper}>
      <Dashboard />
      <div className={styles.painel}>
        <div className={styles.userContainer}>
          <h2>Meu Perfil</h2>
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
