import React, { useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import styles from "./areasExperienciaContent.module.scss";

export default function AreasExperienciaContent() {
  const [inputs, setInputs] = useState([{ value: "" }]);

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

  const handleSubmit = () => {
    const values = inputs.map((input) => input.value);
    // Faça o que desejar com os valores dos inputs
    console.log(values);
  };

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
                <option value='PHP'>PHP</option>
                <option value='React'>React</option>
                <option value='Spring'>Spring</option>
                <option value='Next'>Next</option>
                <option value='Express'>Express</option>
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
      </div>
    </div>
  );
}
