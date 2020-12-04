/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import "./index.css";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ClientesContainer } from "../../App";
import { CobrancasContainer } from "../../App";

export function CreateChargePage() {
  const History = useHistory();
  const { handleSubmit, register, watch } = useForm();
  const { obterClientes, clientes } = ClientesContainer.useContainer();
  const { criarCobranca } = CobrancasContainer.useContainer();

  const idClient = watch("idClient");
  const description = watch("description");
  const value = watch("value");
  const expiration = watch("expiration");

  React.useEffect(() => {
    obterClientes(1, 999);
  }, []);

  return (
    <div className="container-content-form">
      <header>
        <h2>// Criar cobrança</h2>
      </header>
      <form
        onSubmit={handleSubmit((datas) => {
          let valor;
          if (datas.value.indexOf(",") !== -1) {
            valor = datas.value.replace(",", ".") * 100;
          } else {
            valor = datas.value * 100;
          }

          const dados = {
            idDoCliente: datas.idClient,
            descricao: datas.description,
            valor,
            vencimento: datas.expiration,
          };

          criarCobranca(dados);
          History.push("/charges");
        })}
      >
        <label>
          Cliente
          <select name="idClient" ref={register}>
            <option>Selecione o cliente</option>
            {clientes &&
              clientes.map((cliente, i) => {
                return (
                  <option key={i + 1} value={cliente.id}>
                    {cliente.nome}
                  </option>
                );
              })}
          </select>
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
            <input name="expiration" ref={register} type="date" />
          </label>
        </div>
        <div className="container-buttons">
          <button
            type="button"
            onClick={() => {
              History.push("/charges");
            }}
          >
            Cancelar
          </button>
          <button
            disabled={!idClient || !description || !value || !expiration}
            className={
              idClient && description && value && expiration
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
