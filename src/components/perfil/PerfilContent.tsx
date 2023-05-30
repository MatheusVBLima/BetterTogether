import React from "react";
import Dashboard from "../dashboard/Dashboard";
import styles from "./perfilContent.module.scss";
type userMe = {
  id: number;
  name: string;
  email: string;
  projects: [];
  experiences: [];
};

interface Props {
  userMe: userMe;
}

export default function PerfilContent({ userMe }: Props) {
  return (
    <div className={styles.wrapper}>
      <Dashboard />
      <div className={styles.painel}>
        <div className={styles.userContainer}>
          <h2>Meu Perfil</h2>
        </div>
        <div className={styles.formsContainer}>
          <div className={styles.nameContainer}>
            <p>
              <b>Nome:</b> <span>{userMe.name}</span>
            </p>
            <button>Mudar Nome</button>
          </div>
          <div className={styles.emailContainer}>
            <p>
              <b>Email:</b> <span>{userMe.email}</span>
            </p>
            <button>Mudar Email</button>
          </div>
        </div>
      </div>
    </div>
  );
}
