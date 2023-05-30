import React from "react";
import Dashboard from "../dashboard/Dashboard";
import styles from "./meusProjetosContent.module.scss";
import Card from "./card/Card";
import { MaskSad } from "@phosphor-icons/react";

type userMe = {
  id: number;
  name: string;
  email: string;
  projects: [];
  experiences: [];
};

interface Props {
  userMe: userMe;
}

export default function MeusProjetosContent({ userMe }: Props) {
  return (
    <div className={styles.wrapper}>
      <Dashboard />
      <div className={styles.painel}>
        <div className={styles.userContainer}>
          <h2>Meus Projetos</h2>
        </div>
        {userMe.projects.length === 0 ? (
          <div className={styles.noProjectContainer}>
            <p>Você ainda não criou nenhum projeto</p>
            <MaskSad size={35} color='#8d8d99' />
          </div>
        ) : (
          <div className={styles.formsContainer}>
            <Card
              titulo={"titulo"}
              descrição={"descrição"}
              contato={"contato"}
            />
            <Card
              titulo={"titulo"}
              descrição={"descrição"}
              contato={"contato"}
            />
            <Card
              titulo={"titulo"}
              descrição={
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. adsdasdadadadadsdasdasdasda Deleniti consequatur at vel laboriosam consequuntur, totam repellendus explicabo nisi fuga beatae repudiandae aut, corrupti, quasi architecto placeat voluptates quisquam sapiente alias? Et impedit tempore aperiam nisi, atque perspiciatis dolores ad culpa?"
              }
              contato={"contato"}
            />
            <Card
              titulo={"titulo"}
              descrição={"descrição"}
              contato={"contato"}
            />
            <Card
              titulo={"titulo"}
              descrição={"descrição"}
              contato={"contato"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
