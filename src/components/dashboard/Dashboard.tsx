import Link from "next/link";
import React from "react";
import styles from "./dashboard.module.scss";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  const handleVoltar = () => {
    router.back();
  };
  return (
    <div className={styles.wrapper}>
      <h3>Painel</h3>
      <ul>
        <li>
          <Link href={"/painel"}>Painel</Link>
        </li>
        <li>
          <Link href={"/perfil"}>Perfil</Link>
        </li>
        <li>
          <Link href={"/experiencia"}>Adicionar Área de Experiência</Link>
        </li>
        <li>
          <Link href={"/criarProjeto"}>Criar Projeto</Link>
        </li>
        <li>
          <Link href={"/meusProjetos"}>Meus Projetos</Link>
        </li>
        <li>
          <Link href={""} onClick={handleVoltar}>
            Voltar
          </Link>
        </li>
      </ul>
    </div>
  );
}
