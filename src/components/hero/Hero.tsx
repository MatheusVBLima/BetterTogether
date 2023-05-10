import Image from "next/image";
import styles from "./hero.module.scss";
import Link from "next/link";

export default function Hero() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <span>&lt; Olá, Pessoal! /&gt;</span>
        <h1>
          Bem-vindos à página da
          <br /> <span>Better Together</span>
        </h1>
        <p>
          Uma organização que tem como missão promover o empreendedorismo e
          projetos open source. <br />
        </p>
        <Link href={"/cadastro"}>Cadastre-se!</Link>
      </div>
      <Image src='/hero3.png' alt='avatar' width={450} height={521} />
    </div>
  );
}
