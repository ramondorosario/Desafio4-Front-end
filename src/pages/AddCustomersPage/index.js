/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

export function AddCustomersPage() {
  const { handleSubmit, register, watch } = useForm();
  const History = useHistory();

  const name = watch("name");
  const email = watch("email");
  const cpf = watch("cpf");
  const tel = watch("tel");

  return (
    <div className="container-customers">
      <header className="content-add">
        <h2>// Adicionar Cliente</h2>
      </header>
      <form
        onSubmit={handleSubmit(async (datas) => {
          History.push("/customers");
        })}
      >
        <label>
          Nome
          <input name="name" ref={register} />
        </label>
        <label>
          Email
          <input name="email" ref={register} type="email" />
        </label>
        <div>
          <label>
            CPF
            <input name="cpf" ref={register} inputMode="numeric" />
          </label>
          <label>
            Telefone
            <input name="tel" ref={register} inputMode="numeric" />
          </label>
        </div>
        <div className="container-buttons">
          <button
            onClick={() => {
              History.push("/customers");
            }}
          >
            Cancelar
          </button>
          <button
            disabled={!name || !email || !cpf || !tel}
            className={
              name && email && cpf && tel
                ? "config-button-selected"
                : "config-button"
            }
          >
            Adicionar cliente
          </button>
        </div>
      </form>
    </div>
  );
}
