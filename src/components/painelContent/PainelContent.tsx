import Link from "next/link";
import React from "react";
import styles from "./painelContent.module.scss";
import Dashboard from "../dashboard/Dashboard";
import { MaskSad } from "@phosphor-icons/react";

type userMe = {
  id: number;
  name?: string;
  email: string;
  projects: [];
  experiences: [];
};

interface Props {
  userMe: userMe;
}

export default function PainelContent({ userMe }: Props) {
  return (
    <div className={styles.wrapper}>
      <Dashboard />
      <div className={styles.painel}>
        <div className={styles.userContainer}>
          <h2>Olá, {userMe.name}</h2>
        </div>
        {userMe.experiences.length === 0 ? (
          <div className={styles.noProjectContainer}>
            <p>Você ainda não adicionou suas áreas de experiência</p>
            <p>
              Adicione no menu ao lado para assim você poder ver os projetos
              compatíveis
            </p>
            <MaskSad size={35} color='#8d8d99' />
          </div>
        ) : userMe.projects.length === 0 ? (
          <div className={styles.noProjectContainer}>
            <p>
              Infelizmente não temos nenhum projeto compatível com suas áreas de
              experiências atuais
            </p>
            <MaskSad size={35} color='#8d8d99' />
          </div>
        ) : (
          <div className={styles.formsContainer}>
            <div className={styles.cardContainer}>
              <p>projeto</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
