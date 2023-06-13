import Link from "next/link";
import React from "react";
import styles from "./painelContent.module.scss";
import Dashboard from "../dashboard/Dashboard";
import { MaskSad } from "@phosphor-icons/react";

type userExperiences = {
  id: number;
  name: string;
};

type userMe = {
  id: number;
  name?: string;
  email: string;
  projects: [];
  experiences: userExperiences[];
};

type userVacancies = {
  name: string;
  email: string;
  user_id: number;
};

type vacanciesExperiences = {
  id: number;
  name: string;
};

type vacancies = {
  id: number;
  name: string;
  description: string;
  contact: string;
  user: userVacancies;
  experiences: vacanciesExperiences[];
};

interface Props {
  userMe: userMe;
  vacancies: vacancies[];
}

export default function PainelContent({ userMe, vacancies }: Props) {
  return (
    <div className={styles.wrapper}>
      <Dashboard />
      <div className={styles.painel}>
        <div className={styles.userContainer}>
          <h2>Olá, {userMe.name}</h2>
          <h2>Esses são os projetos que combinam com você!</h2>
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
        ) : vacancies.length === 0 ? (
          <div className={styles.noProjectContainer}>
            <p>Infelizmente não temos vagas para você no momento</p>
            <MaskSad size={35} color='#8d8d99' />
          </div>
        ) : (
          <div className={styles.cardContainer}>
            {vacancies.map((vacancy) => (
              <div key={vacancy.id} className={styles.card}>
                <div className={styles.titleContainer}>
                  <span>Nome:</span>
                  <p> {vacancy.name}</p>
                </div>
                <div className={styles.ownerContainer}>
                  <span>Dono:</span> <p>{vacancy.user.name}</p>
                </div>
                <div className={styles.descriptionContainer}>
                  <span>Descrição do Projeto: </span>
                  <p>{vacancy.description}</p>
                </div>
                <div className={styles.experiencesContainer}>
                  <span>Experiências Desejadas:</span>
                  <ul className={styles.experienceContainer}>
                    {vacancy.experiences.map((experience) => (
                      <li key={experience.id}>{experience.name}</li>
                    ))}
                  </ul>
                </div>
                <h4 className={styles.contato}>Contato: {vacancy.contact}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
