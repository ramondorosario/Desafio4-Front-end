import React from "react";
import "../CustomersPage/index.css";

import SearchIcon from "../../images/icon-search.svg";
import PrintTicketIcon from "../../images/icon-print-ticket.svg";
import BackIcon from "../../images/icon-back.svg";
import NextIcon from "../../images/icon-next.svg";

export function ChargesPage() {
  return (
    <>
      <div className="container-nav">
        <div className="container-search">
          <input placeholder="Procurar por Nome, E-mail ou CPF" />
          <button>
            <div>
              <img src={SearchIcon} alt="Botão de busca" />
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
              <th>Descrição</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Vencimento</th>
              <th>Boleto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="datas">
                <div>Nome e Sobrenome do cliente</div>
              </td>
              <td>Aqui vai alguma descrição</td>
              <td>R$ 00.000,00</td>
              <td className="status">[.....] Inadimplente</td>
              <td>12/12/2020</td>
              <td>
                <button>
                  <img src={PrintTicketIcon} alt="Icone editar cliente" />
                </button>
              </td>
            </tr>
            <tr>
              <td className="datas">
                <div>Nome e Sobrenome do cliente</div>
              </td>
              <td>Aqui vai alguma descrição</td>
              <td>R$ 00.000,00</td>
              <td className="status">[.....] Inadimplente</td>
              <td>12/12/2020</td>
              <td>
                <button>
                  <img src={PrintTicketIcon} alt="Icone editar cliente" />
                </button>
              </td>
            </tr>
            <tr>
              <td className="datas">
                <div>Nome e Sobrenome do cliente</div>
              </td>
              <td>Aqui vai alguma descrição</td>
              <td>R$ 00.000,00</td>
              <td className="status">[.....] Inadimplente</td>
              <td>12/12/2020</td>
              <td>
                <button>
                  <img src={PrintTicketIcon} alt="Icone editar cliente" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="container-buttons">
          <button className="back-page">
            <img src={BackIcon} alt="Página anterior" />
          </button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>10</button>
          <button className="next-page">
            <img src={NextIcon} alt="Próxima página" />
          </button>
        </div>
      </div>
    </>
  );
}
