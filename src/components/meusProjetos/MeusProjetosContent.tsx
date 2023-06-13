import React from "react";
import Dashboard from "../dashboard/Dashboard";
import styles from "./meusProjetosContent.module.scss";
import Card from "./card/Card";
import { MaskSad } from "@phosphor-icons/react";

type userMe = {
  id: number;
  name: string;
  email: string;
  projects: [];
  experiences: [];
};

type Candidate = {
  id: number;
  name: string;
  email: string;
  experiences: [];
};

type userMeProjects = {
  id: number;
  name: string;
  description: string;
  contact: string;
  experiences: [];
  candidates: Candidate[][];
};

interface Props {
  userMe: userMe;
  userMeProjects: userMeProjects[];
}

export default function MeusProjetosContent({ userMe, userMeProjects }: Props) {
  return (
    <div className={styles.wrapper}>
      <Dashboard />
      <div className={styles.painel}>
        <div className={styles.userContainer}>
          <h2>Meus Projetos</h2>
        </div>
        {userMe.projects.length === 0 ? (
          <div className={styles.noProjectContainer}>
            <p>Você ainda não criou nenhum projeto</p>
            <MaskSad size={35} color='#8d8d99' />
          </div>
        ) : (
          <div className={styles.formsContainer}>
            {userMeProjects.map((project) => (
              <Card
                key={project.id}
                titulo={project.name}
                descrição={project.description}
                contato={project.contact}
                experiences={project.experiences}
                candidatos={project.candidates}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
