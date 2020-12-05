/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./index.css";

import SearchIcon from "../../images/icon-search.svg";
import EditIcon from "../../images/icon-edit.svg";
import EmailIcon from "../../images/icon-email.svg";
import TelephoneIcon from "../../images/icon-telephone.svg";
import BackIcon from "../../images/icon-back.svg";
import NextIcon from "../../images/icon-next.svg";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ClientesContainer } from "../../App";

export function CustomersPage() {
  const [pagina, setPagina] = React.useState(1);
  const History = useHistory();

  const {
    obterClientes,
    clientes,
    obterClientePorBusca,
    totalDePaginas,
    ultimaPagina,
    totalPaginasDeClientes,
    totalPaginasDeClientesPorBusca,
  } = ClientesContainer.useContainer();
  const { handleSubmit, register } = useForm();

  React.useEffect(() => {
    obterClientes(pagina);
    totalPaginasDeClientes();
  }, []);

  return (
    <>
      <nav>
        <button
          className="add-client"
          onClick={() => {
            History.push("/customers/add");
          }}
        >
          Adicionar cliente
        </button>
        <form
          onSubmit={handleSubmit((data) => {
            if (data.search) {
              obterClientePorBusca(pagina, data.search);
              totalPaginasDeClientesPorBusca();
            } else obterClientes(1);
          })}
        >
          <div className="container-search">
            <input
              placeholder="Procurar por Nome, E-mail ou CPF"
              name="search"
              ref={register}
            />
            <button>
              <div>
                <img src={SearchIcon} alt="Botão de busca" />
                Buscar
              </div>
            </button>
          </div>
        </form>
      </nav>
      <div className="container-table">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Cobranças feitas</th>
              <th>Cobranças recebidas</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {clientes &&
              clientes.map((cliente) => {
                return (
                  <tr key={cliente.email}>
                    <td>
                      <div className="data-name">{cliente.nome}</div>
                      <div>
                        <img src={EmailIcon} alt="Ícone email" />
                        {cliente.email}
                      </div>
                      <div>
                        <img src={TelephoneIcon} alt="Ícone telefone" />
                        {cliente.tel}
                      </div>
                    </td>
                    <td>R$ {(cliente.cobrancasFeitas / 100).toFixed(2)}</td>
                    <td>R$ {(cliente.cobrancasRecebidas / 100).toFixed(2)}</td>
                    <td
                      className={`status ${
                        cliente.estaInadimplente ? "not-in-day" : "in-day"
                      }`}
                    >
                      {cliente.estaInadimplente ? "inadimplente" : "em dia"}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          History.push("/customers/edit");
                          obterClientePorBusca(1, cliente.email, 1);
                        }}
                      >
                        <img src={EditIcon} alt="Icone editar cliente" />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="container-buttons">
          <button
            className={`back-page ${pagina === 1 ? "disabled" : ""}`}
            onClick={() => {
              if (pagina === 1) return;
              setPagina(pagina - 1);
              obterClientes(pagina - 1);
            }}
          >
            <img src={BackIcon} alt="Página anterior" />
          </button>
          {totalDePaginas ? (
            totalDePaginas.map((p, i) => {
              return (
                <button
                  key={i + 1}
                  onClick={() => {
                    setPagina(i + 1);
                    obterClientes(i + 1);
                  }}
                >
                  <div className={pagina === i + 1 ? "btnContainer" : ""}>
                    {i + 1}
                  </div>
                </button>
              );
            })
          ) : (
            <button className="btnContainer">1</button>
          )}
          <button
            className={`next-page ${pagina === ultimaPagina ? "disabled" : ""}`}
            onClick={() => {
              if (pagina === totalDePaginas.length) return;
              setPagina(pagina + 1);
              obterClientes(pagina + 1);
            }}
          >
            <img src={NextIcon} alt="Próxima página" />
          </button>
        </div>
      </div>
    </>
  );
}
