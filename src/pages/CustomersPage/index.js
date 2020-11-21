import SearchIcon from "../../images/icon-search.svg";
import EditIcon from "../../images/icon-edit.svg";
import EmailIcon from "../../images/icon-email.svg";
import TelephoneIcon from "../../images/icon-telephone.svg";
import BackIcon from "../../images/icon-back.svg";
import NextIcon from "../../images/icon-next.svg";

import { useHistory } from "react-router-dom";

import "./index.css";

export function CustomersPage() {
  const History = useHistory();

  return (
    <>
      <div className="container-nav">
        <button
          className="add-client"
          onClick={() => {
            History.push("/customers/add");
          }}
        >
          Adicionar cliente
        </button>
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
              <th>Cobranças feitas</th>
              <th>Cobranças recebidas</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="datas">
                <div>Nome e Sobrenome do cliente</div>
                <div>
                  <img src={EmailIcon} alt="Ícone email" />
                  Nome e Sobrenome do cliente
                </div>
                <div>
                  <img src={TelephoneIcon} alt="Ícone telefone" />
                  Nome e Sobrenome do cliente
                </div>
              </td>
              <td>R$ 00.000,00</td>
              <td>R$ 00.000,00</td>
              <td className="status">Em dia</td>
              <td>
                <button>
                  <img src={EditIcon} alt="Icone editar cliente" />
                </button>
              </td>
            </tr>
            <tr>
              <td className="datas">
                <div>Nome e Sobrenome do cliente</div>
                <div>
                  <img src={EmailIcon} alt="Ícone email" />
                  Nome e Sobrenome do cliente
                </div>
                <div>
                  <img src={TelephoneIcon} alt="Ícone telefone" />
                  Nome e Sobrenome do cliente
                </div>
              </td>
              <td>R$ 00.000,00</td>
              <td>R$ 00.000,00</td>
              <td className="status">Inadimplente</td>
              <td>
                <button>
                  <img src={EditIcon} alt="Icone editar cliente" />
                </button>
              </td>
            </tr>
            <tr>
              <td className="datas">
                <div>Nome e Sobrenome do cliente</div>
                <div>
                  <img src={EmailIcon} alt="Ícone email" />
                  Nome e Sobrenome do cliente
                </div>
                <div>
                  <img src={TelephoneIcon} alt="Ícone telefone" />
                  Nome e Sobrenome do cliente
                </div>
              </td>
              <td>R$ 00.000,00</td>
              <td>R$ 00.000,00</td>
              <td className="status">Pendente</td>
              <td>
                <button>
                  <img src={EditIcon} alt="Icone editar cliente" />
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
