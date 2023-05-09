import Link from "next/link";
import React from "react";
import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <header className={styles.footerWrapper}>
      <div className={styles.footerContainer}>
        {/* <span>Better Together</span> */}
        <ul>
          <li>
            <span>Contato</span>
          </li>
          <li>Email: matheus.lima@ccc.ufcg.edu.br</li>
        </ul>
      </div>
    </header>
  );
}
