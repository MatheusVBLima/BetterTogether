import React from "react";
import styles from "./card.module.scss";

interface CardProps {
  titulo: string;
  descrição: string;
  contato: string;
  experiences: Experience[];
  candidatos: Candidate[][];
}

type Experience = {
  id: number;
  name: string;
};

type Candidate = {
  id: number;
  name: string;
  email: string;
  experiences: Experience[];
};

export default function Card({
  titulo,
  descrição,
  candidatos,
  experiences,
  contato,
}: CardProps) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.titleContainer}>
        <span>Título:</span>
        <p>{titulo}</p>
      </div>
      <div className={styles.descriptionContainer}>
        <span>Descrição:</span>
        <p>{descrição}</p>
      </div>
      <div className={styles.experiencesContainer}>
        <span>Experiências do Projeto:</span>
        {experiences.map((experience) => (
          <li key={experience.id}>{experience.name}</li>
        ))}
      </div>
      {/*  <div className={styles.contactContainer}>
        <span>Contato:</span>
        <p>{contato}</p>
      </div> */}
      <div className={styles.candidatesContainer}>
        <span>Candidatos:</span>
        <ul>
          {candidatos.map((candidatoArray) =>
            candidatoArray.map((candidato) => (
              <li key={candidato.id} className={styles.candidateContainer}>
                <p className={styles.candidateNameContainer}>
                  <span>nome:</span>
                  {candidato.name}
                </p>
                <p className={styles.candidateEmailContainer}>
                  <span>contato:</span>
                  {candidato.email}
                </p>
                {candidato.experiences &&
                  Array.isArray(candidato.experiences) && (
                    <ul className={styles.candidateExperiencesContainer}>
                      <span>Experiências:</span>
                      <div className={styles.candidateExperienceContainer}>
                        {candidato.experiences.map((experience) => (
                          <li key={experience.id}>{experience.name}</li>
                        ))}
                      </div>
                    </ul>
                  )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
