/* eslint-disable react-hooks/exhaustive-deps */
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
import { RelatorioContainer } from "../../App";
import { useForm } from "react-hook-form";

function statusPayment(status) {
  if (status === "AGUARDANDO") {
    return (
      <>
        <img src={PaymentPendingIcon} alt="Pagamento pendente" />
        <span className="statusPayment paymentPending status-hover">
          Pendente
        </span>
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
    totalDePaginas,
    ultimaPagina,
    totalPaginasDeCobranca,
    totalPaginasDeCobrancaPorBusca,
    obterCobrancasPorBusca,
    novaCobranca,
    pagarCobranca,
  } = CobrancasContainer.useContainer();
  const { obterRelatorio, saldo } = RelatorioContainer.useContainer();

  const { handleSubmit, register } = useForm();

  React.useEffect(async () => {
    obterCobrancas(pagina);
    totalPaginasDeCobranca();
  }, [novaCobranca, saldo]);

  return (
    <>
      <nav className="nav-charges-page">
        <div className="container-search">
          <form
            onSubmit={handleSubmit((data) => {
              if (data.search) {
                obterCobrancasPorBusca(data.search, pagina);
                totalPaginasDeCobrancaPorBusca(data.search);
              } else obterCobrancas(1);
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
                    <td
                      onClick={() => {
                        if (registro.status === "AGUARDANDO") {
                          const dados = { idDaCobranca: registro.id };
                          pagarCobranca(dados);
                          obterRelatorio();
                        }
                      }}
                    >
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
          <button
            className={`back-page ${pagina === 1 ? "disabled" : ""}`}
            onClick={() => {
              if (pagina === 1) return;
              setPagina(pagina - 1);
              obterCobrancas(pagina - 1);
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
                    obterCobrancas(i + 1);
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
              obterCobrancas(pagina + 1);
            }}
          >
            <img src={NextIcon} alt="Próxima página" />
          </button>
        </div>
      </div>
    </>
  );
}
