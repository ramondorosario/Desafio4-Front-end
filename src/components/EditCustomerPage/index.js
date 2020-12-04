/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ClientesContainer } from "../../App";

export function EditCustomerPage() {
  const History = useHistory();
  const { handleSubmit, register, watch } = useForm();
  const { editarCliente, clientes } = ClientesContainer.useContainer();

  const name = watch("name");
  const email = watch("email");
  const cpf = watch("cpf");
  const tel = watch("tel");

  return (
    <div className="container-content-form">
      <header>
        <h2>// Editar Cliente</h2>
      </header>
      <form
        onSubmit={handleSubmit(async (datas) => {
          const dados = {
            id: clientes[0].id,
            nome: datas.name,
            cpf: datas.cpf,
            email: datas.email,
          };

          editarCliente(dados);
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
            type="button"
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
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  );
}
