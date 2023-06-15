import React, { FormEvent, useContext, useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import styles from "./perfilContent.module.scss";
import { Context } from "@/context/Context";
import { ClipLoader } from "react-spinners";
import { CheckCircle } from "phosphor-react";

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

export default function PerfilContent({ userMe }: Props) {
  const [Error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isName, setIsName] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { changeUserCredential } = useContext(Context);

  function handleIsName() {
    setIsName(true);
    setIsPassword(false);
  }

  function handleIsPassword() {
    setIsPassword(true);
    setIsName(false);
  }

  async function handleChangeName(event: FormEvent) {
    event.preventDefault();
    const data = {
      name,
    };
    try {
      setIsLoading(true);
      await changeUserCredential(data);
      setConfirm(true);
    } catch (error) {
      if (error.response && error.response.data) {
        const { message, details } = error.response.data;
        if (details) {
          const errorMessages = Object.entries(details)
            .map(([key, value]) => `${key}: ${value}`)
            .join("; ");
          setError(`Erro no envio de dados: ${errorMessages}`);
        } else if (message) {
          setError(message);
        } else {
          setError("Ocorreu um erro ao processar a solicitação.");
        }
      } else {
        setError("Ocorreu um erro ao processar a solicitação.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleChangePassword(event: FormEvent) {
    event.preventDefault();
    const data = {
      password,
    };
    try {
      setIsLoading(true);
      await changeUserCredential(data);
      setConfirm(true);
    } catch (error) {
      if (error.response && error.response.data) {
        const { message, details } = error.response.data;
        if (details) {
          const errorMessages = Object.entries(details)
            .map(([key, value]) => `${key}: ${value}`)
            .join("; ");
          setError(`Erro no envio de dados: ${errorMessages}`);
        } else if (message) {
          setError(message);
        } else {
          setError("Ocorreu um erro ao processar a solicitação.");
        }
      } else {
        setError("Ocorreu um erro ao processar a solicitação.");
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className={styles.wrapper}>
      <Dashboard />
      <div className={styles.painel}>
        <div className={styles.userContainer}>
          <h2>Meu Perfil</h2>
        </div>
        <div className={styles.choiceContainer}>
          <div className={styles.nameContainer}>
            <p>
              <b>Nome:</b> <span>{userMe.name}</span>
            </p>
          </div>
          <div className={styles.buttonsContainer}>
            <a onClick={handleIsName}>Mudar Nome</a>
            <a onClick={handleIsPassword}>Mudar Senha</a>
          </div>
        </div>
        <div className={styles.formContainer}>
          {isName ? (
            <form onSubmit={handleChangeName}>
              <input type='text' placeholder='Novo Nome' required />
              <input
                type='text'
                placeholder='Confirmar Novo Nome'
                required
                onChange={(e) => setName(e.target.value)}
              />
              <button type='submit'>Enviar</button>
              {isLoading && (
                <ClipLoader
                  color={"#f3bf22"}
                  loading={isLoading}
                  size={50}
                  className={styles.spinner}
                />
              )}
              {confirm ? (
                <CheckCircle size={35} color='green' />
              ) : Error && !confirm ? (
                <p>{Error}</p>
              ) : null}
            </form>
          ) : (
            <form onSubmit={handleChangePassword}>
              <input type='password' placeholder='Nova Senha' required />
              <input
                type='password'
                placeholder='Confirmar Nova Senha'
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type='submit'>Enviar</button>
              {isLoading && (
                <ClipLoader
                  color={"#f3bf22"}
                  loading={isLoading}
                  size={50}
                  className={styles.spinner}
                />
              )}
              {confirm ? (
                <CheckCircle size={35} color='green' />
              ) : Error && !confirm ? (
                <p>{Error}</p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* {isLoading && (
              <ClipLoader
                color={"#f3bf22"}
                loading={isLoading}
                size={50}
                className={styles.spinner}
              />
            )}
            {confirm ? (
              <CheckCircle size={35} color='green' />
            ) : Error && !confirm ? (
              <p>{Error}</p>
            ) : null} */
