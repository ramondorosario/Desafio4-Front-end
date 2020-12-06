import React from "react";
import "./index.css";

import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { Header } from "./components/Header";
import { MenuBar } from "./components/MenuBar";
import { HomePage } from "./components/HomePage";
import { CustomersPage } from "./components/CustomersPage";
import { AddCustomersPage } from "./components/AddCustomersPage";
import { EditCustomerPage } from "./components/EditCustomerPage";
import { ChargesPage } from "./components/ChargesPage";
import { CreateChargePage } from "./components/CreateChargePage";
import { RecoverPassword } from "./components/RecoverPassword";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { createContainer } from "unstated-next";

import { LoginContainer } from "./index";

function useRelatorio() {
  const [saldo, setSaldo] = React.useState(0);
  const [relatorio, setRelatorio] = React.useState();
  const { token } = LoginContainer.useContainer();

  function obterRelatorio() {
    fetch("https://back-desafio4-ramon.herokuapp.com/relatorios", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.dados.relatorio) {
          setSaldo(res.dados.relatorio.saldoEmConta / 100);
          setRelatorio(res.dados.relatorio);
        }
      });
  }

  return { saldo, setSaldo, obterRelatorio, relatorio };
}

function useCobrancas() {
  const { token } = LoginContainer.useContainer();
  const [cobrancas, setCobrancas] = React.useState();
  const [novaCobranca, setNovaCobranca] = React.useState([]);
  const [pagamentoRealizado, setPagamentoRealizado] = React.useState();
  const [totalDePaginas, setTotalDePaginas] = React.useState();
  const [ultimaPagina, setUltimaPagina] = React.useState();

  function obterCobrancas(pagina = 1, qtdPorPagina = 10) {
    fetch(
      `https://back-desafio4-ramon.herokuapp.com/cobrancas?cobrancasPorPagina=${qtdPorPagina}&offset=${
        (pagina - 1) * 10
      }`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status >= 200 && res.status <= 399) {
          setCobrancas(res.dados.cobrancas);
        }
      });
  }

  function obterCobrancasPorBusca(busca, pagina = 1, qtdPorPagina = 10) {
    fetch(
      `https://back-desafio4-ramon.herokuapp.com/cobrancas?busca=${busca}&cobrancasPorPagina=${qtdPorPagina}&offset=${
        (pagina - 1) * 10
      }`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status >= 200 && res.status <= 399) {
          setCobrancas(res.dados.cobrancas);
        } else setCobrancas(false);
      });
  }

  function criarCobranca(dados) {
    fetch("https://back-desafio4-ramon.herokuapp.com/cobrancas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dados),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status >= 200 && res.status <= 399)
          setNovaCobranca(res.dados.cobranca);
      });
  }

  function totalPaginasDeCobranca() {
    fetch(
      `https://back-desafio4-ramon.herokuapp.com/cobrancas?cobrancasPorPagina=99999&offset=0`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status >= 200 && res.status <= 399) {
          const paginas = Math.ceil(res.dados.cobrancas.length / 10);
          const arrayParaMap = [];
          for (let i = 1; i <= paginas; i++) {
            arrayParaMap.push(i);
          }
          console.log("array para map: ", arrayParaMap);

          setTotalDePaginas(arrayParaMap);
          setUltimaPagina(arrayParaMap.length);
        }
      });
  }

  function totalPaginasDeCobrancaPorBusca(busca) {
    fetch(
      `https://back-desafio4-ramon.herokuapp.com/cobrancas?busca=${busca}&cobrancasPorPagina=99999&offset=0`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status >= 200 && res.status <= 399) {
          const paginas = Math.ceil(res.dados.cobrancas.length / 10);
          const arrayParaMap = [];

          for (let i = 1; i <= paginas; i++) {
            arrayParaMap.push(i);
          }
          setTotalDePaginas(arrayParaMap);
          setUltimaPagina(arrayParaMap.length);
        }
      });
  }

  function pagarCobranca(dados) {
    fetch(`https://back-desafio4-ramon.herokuapp.com/cobrancas`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dados),
    })
      .then((res) => res.json)
      .then((res) => {
        if (res.status >= 200 && res.status <= 399) setPagamentoRealizado(true);
      });
  }

  return {
    obterCobrancas,
    cobrancas,
    totalDePaginas,
    totalPaginasDeCobranca,
    totalPaginasDeCobrancaPorBusca,
    obterCobrancasPorBusca,
    criarCobranca,
    ultimaPagina,
    novaCobranca,
    pagarCobranca,
    pagamentoRealizado,
  };
}

function useClientes() {
  const { token } = LoginContainer.useContainer();
  const [clientes, setClientes] = React.useState();
  const [totalDePaginas, setTotalDePaginas] = React.useState();
  const [ultimaPagina, setUltimaPagina] = React.useState();

  function obterClientes(pagina = 1, qtdPorPagina = 10) {
    fetch(
      `https://back-desafio4-ramon.herokuapp.com/clientes?clientesPorPagina=${qtdPorPagina}&offset=${
        (pagina - 1) * 10
      }`,
      { method: "GET", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status >= 200 && res.status <= 399) {
          setClientes(res.dados.clientes);
        }
      });
  }

  function obterClientePorBusca(pagina = 1, busca, qtdPorPagina = 10) {
    fetch(
      `https://back-desafio4-ramon.herokuapp.com/clientes?busca=${busca}&clientesPorPagina=${qtdPorPagina}&offset=${
        (pagina - 1) * 10
      }`,
      { method: "GET", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status >= 200 && res.status <= 399) {
          setClientes(res.dados.clientes);
        } else setClientes(false);
      });
  }

  function criarCliente(dados) {
    fetch(`https://back-desafio4-ramon.herokuapp.com/clientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dados),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status >= 200 && res.status < 399) {
          obterClientes(1);
        }
      });
  }

  function editarCliente(dados) {
    fetch(`https://back-desafio4-ramon.herokuapp.com/clientes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dados),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status >= 200 && res.status < 399) {
          console.log("atualizado");
        }
      });
  }

  function totalPaginasDeClientes() {
    fetch(
      `https://back-desafio4-ramon.herokuapp.com/clientes?clientesPorPagina=99999&offset=0`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status >= 200 && res.status <= 399) {
          const paginas = Math.ceil(res.dados.clientes.length / 10);
          const arrayParaMap = [];
          for (let i = 1; i <= paginas; i++) {
            arrayParaMap.push(i);
          }

          setTotalDePaginas(arrayParaMap);
          setUltimaPagina(arrayParaMap.length);
        }
      });
  }

  function totalPaginasDeClientesPorBusca(busca) {
    fetch(
      `https://back-desafio4-ramon.herokuapp.com/clientes?busca=${busca}&clientesPorPagina=99999&offset=0`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status >= 200 && res.status <= 399) {
          const paginas = Math.ceil(res.dados.clientes.length / 10);
          const arrayParaMap = [];

          for (let i = 1; i <= paginas; i++) {
            arrayParaMap.push(i);
          }
          setTotalDePaginas(arrayParaMap);
          setUltimaPagina(arrayParaMap.length);
        }
      });
  }

  return {
    obterClientes,
    clientes,
    totalDePaginas,
    obterClientePorBusca,
    criarCliente,
    editarCliente,
    ultimaPagina,
    totalPaginasDeClientes,
    totalPaginasDeClientesPorBusca,
  };
}

function useUsuario() {
  function criarConta(dados) {
    fetch("https://back-desafio4-ramon.herokuapp.com/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }

  return { criarConta };
}

export const RelatorioContainer = createContainer(useRelatorio);
export const CobrancasContainer = createContainer(useCobrancas);
export const ClientesContainer = createContainer(useClientes);
export const UsuariosContainer = createContainer(useUsuario);

export default function App() {
  const { token } = LoginContainer.useContainer();

  return (
    <BrowserRouter>
      {!token && (
        <>
          <Switch>
            <UsuariosContainer.Provider>
              <Route exact path="/login" component={LoginPage} />
              <Route
                exact
                path="/recover-password"
                component={RecoverPassword}
              />
              <Route exact path="/signup" component={SignupPage} />
              <Route path="*" render={() => <Redirect to="/login" />} />
            </UsuariosContainer.Provider>
          </Switch>
        </>
      )}
      {token && (
        <>
          <RelatorioContainer.Provider>
            <ClientesContainer.Provider>
              <div className="columns">
                <div className="column-menu-bar">
                  <MenuBar />
                </div>
                <div className="column-main">
                  <Header />
                  <Switch>
                    <Route exact path="/home" component={HomePage} />
                    <Route exact path="/customers" component={CustomersPage} />
                    <Route
                      exact
                      path="/customers/add"
                      component={AddCustomersPage}
                    />
                    <Route
                      exact
                      path="/customers/edit"
                      component={EditCustomerPage}
                    />
                    <Route path={["/charges", "/charges/new-charge"]}>
                      <CobrancasContainer.Provider>
                        <Route exact path="/charges" component={ChargesPage} />
                        <Route
                          exact
                          path="/charges/new-charge"
                          component={CreateChargePage}
                        />
                      </CobrancasContainer.Provider>
                    </Route>
                    <Route path="/" render={() => <Redirect to="/home" />} />
                  </Switch>
                </div>
              </div>
            </ClientesContainer.Provider>
          </RelatorioContainer.Provider>
        </>
      )}
    </BrowserRouter>
  );
}
