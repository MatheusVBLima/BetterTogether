import Link from "next/link";
import React from "react";
import styles from "./headerApp.module.scss";

export default function HeaderApp() {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <span>
          Better <span>Together </span>
        </span>
        <Link href='/login'>Login</Link>
      </div>
    </header>
  );
}
