/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import "./index.css";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

export function CreateChargePage() {
  const History = useHistory();
  const { handleSubmit, register, watch } = useForm();

  const name = watch("name");
  const description = watch("description");
  const value = watch("value");
  const expiration = watch("tel");

  return (
    <div className="container-content-form">
      <header>
        <h2>// Criar cobrança</h2>
      </header>
      <form onSubmit={handleSubmit((datas) => {})}>
        <label>
          Cliente
          <input name="name" ref={register} />
        </label>
        <label>
          Descrição
          <textarea name="description" ref={register}></textarea>
          <span>A descrição informada será impressa no boleto.</span>
        </label>
        <div className="teste">
          <label className="charge-value">
            Valor
            <input name="value" ref={register} placeholder="R$ 0,00" />
          </label>
          <label className="charge-expiration">
            Vencimento
            <input name="expiration" type="date" />
          </label>
        </div>
        <div className="container-buttons">
          <button
            onClick={() => {
              History.push("/charges");
            }}
          >
            Cancelar
          </button>
          <button
            disabled={!name || !description || !value || !expiration}
            className={
              name && description && value && expiration
                ? "config-button-selected"
                : "config-button"
            }
          >
            Criar cobrança
          </button>
        </div>
      </form>
    </div>
  );
}
