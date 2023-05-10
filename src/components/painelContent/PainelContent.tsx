import Link from "next/link";
import React from "react";
import styles from "./painelContent.module.scss";
import Dashboard from "../dashboard/Dashboard";
import { Bell } from "@phosphor-icons/react";

export default function PainelContent() {
  return (
    <div className={styles.wrapper}>
      <Dashboard />
      <div className={styles.painel}>
        <div className={styles.userContainer}>
          <h2>Olá, Usuário!</h2>
        </div>
        <div className={styles.noProjectContainer}>
          <p>Você ainda não foi conectado com nenhuma projeto</p>
          <Bell size={35} color='#8d8d99' />
        </div>
      </div>
    </div>
  );
}
