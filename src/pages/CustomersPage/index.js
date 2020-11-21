import React from "react";
import IconSearch from "../../images/icon-search.svg";

import "./index.css";

export function CustomersPage() {
  return (
    <>
      <div className="container-nav">
        <button className="add-client">Adicionar cliente</button>
        <div className="container-search">
          <input placeholder="Procurar por Nome, E-mail ou CPF" />
          <button>
            <div>
              <img src={IconSearch} alt="Botão de busca" />
              Buscar
            </div>
          </button>
        </div>
      </div>
      <div className="container-main">
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
        </table>
      </div>
    </>
  );
}
