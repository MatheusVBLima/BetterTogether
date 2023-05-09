import Link from "next/link";
import React from "react";
import styles from "./headerAuth.module.scss";

export default function HeaderAuth() {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <span>
          Better <span>Together</span>
        </span>
        <Link href='/'>Voltar</Link>
      </div>
    </header>
  );
}
