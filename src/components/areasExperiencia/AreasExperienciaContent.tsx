import React, { FormEvent, useContext, useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import styles from "./areasExperienciaContent.module.scss";
import { Context } from "@/context/Context";
import { ClipLoader } from "react-spinners";
import { CheckCircle } from "phosphor-react";

export default function AreasExperienciaContent() {
  const [inputs, setInputs] = useState([{ value: "" }]);
  const { addExperience } = useContext(Context);
  const [Error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    const lastInput = inputs[inputs.length - 1];
    if (lastInput.value !== "") {
      const newInputs = [...inputs, { value: "" }];
      setInputs(newInputs);
    }
  };

  const handleRemoveInput = () => {
    if (inputs.length > 1) {
      const newInputs = [...inputs];
      newInputs.pop();
      setInputs(newInputs);
    }
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const values = inputs.map((input) => input.value);
    const data = {
      experience_name: values,
    };

    try {
      setIsLoading(true);
      await addExperience(data);
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
          <h2>Adicione suas áreas de experiência</h2>
        </div>
        <div className={styles.formsContainer}>
          {inputs.map((input, index) => (
            <div key={index}>
              <label htmlFor={`select-${index}`}>
                Selecione uma área de experiência
              </label>
              <select
                id={`select-${index}`}
                value={input.value}
                onChange={(event) => handleInputChange(index, event)}
              >
                <option value=''>Selecione...</option>
                <option value='1'>PHP</option>
                <option value='3'>React</option>
                {/* <option value='Spring'>Spring</option> */}
                <option value='2'>Next</option>
                <option value='4'>Express</option>
              </select>
            </div>
          ))}
        </div>
        <div className={styles.buttonsContainer}>
          {inputs[inputs.length - 1].value !== "" && (
            <button onClick={handleAddInput}>+</button>
          )}
          {inputs.length > 1 && <button onClick={handleRemoveInput}>-</button>}
        </div>
        <button onClick={handleSubmit}>Enviar</button>
        <div className={styles.errorContainer}>
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
        </div>
      </div>
    </div>
  );
}
