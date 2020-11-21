/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import "./index.css";

export function AddCustomersPage() {
  return (
    <div className="contaier-customers-add">
      <header className="content-add">
        <h2>// Adicionar Cliente</h2>
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
          <button>Cancelar</button>
          <button className="add-button">Adicionar cliente</button>
        </div>
      </form>
    </div>
  );
}
