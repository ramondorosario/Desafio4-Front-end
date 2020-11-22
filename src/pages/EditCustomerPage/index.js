/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import "../AddCustomersPage/index.css";
import { useHistory } from "react-router-dom";

export function EditCustomerPage() {
  const History = useHistory();

  return (
    <div className="contaier-customers">
      <header className="content-add">
        <h2>// Editar Cliente</h2>
      </header>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label>
          Nome
          <input name="name" />
        </label>
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <div>
          <label>
            CPF
            <input name="cpf" inputMode="numeric" />
          </label>
          <label>
            Telefone
            <input name="tel" inputMode="numeric" />
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
            className="config-button"
            onClick={() => {
              History.push("/customers");
            }}
          >
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  );
}
