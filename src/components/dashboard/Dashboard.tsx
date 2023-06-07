import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.scss";
import { List, X } from "@phosphor-icons/react";

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {isMobile ? <MobileMenu /> : <DesktopMenu />}
    </div>
  );
}

function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <button className={styles.menuIcon} onClick={toggleMenu}>
        {menuOpen ? (
          <div className={styles.menuMobileTitle}>
            <h3>Menu</h3>
            <X size={34} color='white' />
          </div>
        ) : (
          <div className={styles.menuMobileTitle}>
            <h3>Menu</h3>
            <List size={34} color='white' />
          </div>
        )}
      </button>

      {menuOpen && (
        <ul className={styles.menu}>
          <li>
            <Link href={"/painel"}>Painel</Link>
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
            <Link href={"/perfil"}>Perfil</Link>
          </li>
        </ul>
      )}
    </>
  );
}

function DesktopMenu() {
  return (
    <>
      <h3>Menu</h3>
      <ul className={styles.menu}>
        <li>
          <Link href={"/painel"}>Painel</Link>
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
          <Link href={"/perfil"}>Perfil</Link>
        </li>
      </ul>
    </>
  );
}
