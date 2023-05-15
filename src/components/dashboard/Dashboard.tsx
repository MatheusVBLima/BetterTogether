import Link from "next/link";
import React from "react";
import styles from "./dashboard.module.scss";

export default function Dashboard() {
  return (
    <div className={styles.wrapper}>
      <h3>Painel</h3>
      <ul>
        <li>
          <Link href={"/perfil"}>Perfil</Link>
        </li>
        <li>
          <Link href={"/areasExperiencia"}>Adicionar Área de Experiência</Link>
        </li>
        <li>
          <Link href={"/criarProjeto"}>Criar Projeto</Link>
        </li>
        <li>
          <Link href={"/meusProjetos"}>Meus Projetos</Link>
        </li>
        <li>
          <Link href={""}>Voltar</Link>
        </li>
      </ul>
    </div>
  );
}
