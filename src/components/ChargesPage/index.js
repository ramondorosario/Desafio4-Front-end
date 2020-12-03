import React from "react";
import "./index.css";

import dayjs from "dayjs";

import SearchIcon from "../../images/icon-search.svg";
import PrintTicketIcon from "../../images/icon-print-ticket.svg";
import BackIcon from "../../images/icon-back.svg";
import NextIcon from "../../images/icon-next.svg";
import PaymentOkIcon from "../../images/icon-payment-ok.svg";
import PaymentPendingIcon from "../../images/icon-payment-pending.svg";

import { CobrancasContainer } from "../../App";
import { useForm } from "react-hook-form";

function statusPayment(status) {
  if (status === "AGUARDANDO") {
    return (
      <>
        <img src={PaymentPendingIcon} alt="Pagamento pendente" />
        <span className="statusPayment paymentPending">Pendente</span>
      </>
    );
  } else if (status === "PAGO") {
    return (
      <>
        <img src={PaymentOkIcon} alt="Pagamento feito" />
        <span className="statusPayment paymentOk">Pago</span>
      </>
    );
  } else {
    return <span className="statusPayment paymentExpiration">Vencido</span>;
  }
}

export function ChargesPage() {
  const [pagina, setPagina] = React.useState(1);

  const {
    obterCobrancas,
    cobrancas,
    obterCobrancasPorBusca,
  } = CobrancasContainer.useContainer();

  const { handleSubmit, register } = useForm();

  React.useEffect(() => {
    obterCobrancas(pagina);
  }, []);

  return (
    <>
      <nav className="nav-charges-page">
        <div className="container-search">
          <form
            onSubmit={handleSubmit((data) => {
              if (data.search) obterCobrancasPorBusca(data.search, pagina);
              else obterCobrancas(1);
            })}
          >
            <input
              ref={register}
              name="search"
              placeholder="Procurar por Nome, E-mail ou CPF"
            />
            <button>
              <div>
                <img src={SearchIcon} alt="Botão de busca" />
                Buscar
              </div>
            </button>
          </form>
        </div>
      </nav>
      <div className="container-table">
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
            {cobrancas &&
              cobrancas.map((registro) => {
                return (
                  <tr key={registro.id}>
                    <td className="data-name">{registro.nomeDoCliente}</td>
                    <td>{registro.descricao}</td>
                    <td>R$ {(registro.valor / 100).toFixed(2)}</td>
                    <td className="status">
                      {" "}
                      {statusPayment(registro.status)}
                    </td>
                    <td>{dayjs(registro.vencimento).format("DD/MM/YYYY")}</td>
                    <td>
                      <button>
                        <img src={PrintTicketIcon} alt="Icone editar cliente" />
                      </button>
                    </td>
                  </tr>
                );
              })}
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
