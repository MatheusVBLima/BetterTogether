import Link from "next/link";
import React, { useContext } from "react";
import styles from "./headerDashboard.module.scss";
import { Context } from "@/context/Context";

export default function HeaderDashboard() {
  const { signOut } = useContext(Context);

  function handleSignOut() {
    signOut();
  }

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <span>
          Better <span>Together</span>
        </span>
        <Link onClick={handleSignOut} href={""}>
          Sair
        </Link>
      </div>
    </header>
  );
}
