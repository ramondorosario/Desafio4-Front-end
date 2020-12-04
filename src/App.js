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

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { createContainer } from "unstated-next";

import { LoginContainer } from "./index";

function useRelatorio() {
  const [saldo, setSaldo] = React.useState(0);
  const [relatorio, setRelatorio] = React.useState();
  const { token } = LoginContainer.useContainer();

  function obterRelatorio() {
    fetch("http://localhost:8081/relatorios", {
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

  function obterCobrancas(pagina) {
    fetch(
      `http://localhost:8081/cobrancas?cobrancasPorPagina=10&offset=${
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

  function obterCobrancasPorBusca(busca, pagina) {
    fetch(
      `http://localhost:8081/cobrancas?busca=${busca}&cobrancasPorPagina=10&offset=${
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
    fetch("http://localhost:8081/cobrancas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dados),
    })
      .then()
      .catch((err) => console.log(err));
  }

  return { obterCobrancas, cobrancas, obterCobrancasPorBusca, criarCobranca };
}

function useClientes() {
  const { token } = LoginContainer.useContainer();
  const [clientes, setClientes] = React.useState();

  function obterClientes(pagina, qtdPorPagina = 10) {
    fetch(
      `http://localhost:8081/clientes?clientesPorPagina=${qtdPorPagina}&offset=${
        (pagina - 1) * 10
      }`,
      { method: "GET", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status >= 200 && res.status <= 399) {
          setClientes(res.dados.clientes);
          console.log(res.dados.clientes);
        }
      });
  }

  function obterClientePorBusca(pagina, busca) {
    fetch(
      `http://localhost:8081/clientes?busca=${busca}&clientesPorPagina=10&offset=${
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
    fetch(`http://localhost:8081/clientes`, {
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

  return { obterClientes, clientes, obterClientePorBusca, criarCliente };
}

export const RelatorioContainer = createContainer(useRelatorio);
export const CobrancasContainer = createContainer(useCobrancas);
export const ClientesContainer = createContainer(useClientes);

export default function App() {
  const { token } = LoginContainer.useContainer();

  return (
    <BrowserRouter>
      {!token && (
        <>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route path="*" render={() => <Redirect to="/login" />} />
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
