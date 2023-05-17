import React from "react";
import styles from "./card.module.scss";

interface CardProps {
  titulo: string;
  descrição: string;
  contato: string;
}

export default function Card({ titulo, descrição, contato }: CardProps) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.pContainer}>
        <span>Título:</span>
        <p>{titulo}</p>
      </div>
      <div className={styles.pContainer}>
        <span>Descrição:</span>
        <p>{descrição}</p>
      </div>
      <div className={styles.pContainer}>
        <span>Contato:</span>
        <p>{contato}</p>
      </div>
    </div>
  );
}
