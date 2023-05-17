import Link from "next/link";
import React from "react";
import styles from "./headerDashboard.module.scss";

export default function HeaderDashboard() {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <span>
          Better <span>Together</span>
        </span>
        <Link href='/login'>Sair</Link>
      </div>
    </header>
  );
}
