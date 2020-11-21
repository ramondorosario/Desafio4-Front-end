import React from "react";
import "./index.css";

import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { HomePage } from "./pages/HomePage";
import LogoAcademyWhite from "./images/logo-academy-white.svg";
import HomeIcon from "./images/icon-home.svg";
import CustomersIcon from "./images/icon-customers.svg";
import BillingIcon from "./images/icon-billing.svg";
import UserIcon from "./images/icon-user.svg";
import LogoutIcon from "./images/icon-logout.svg";
import IconDollar from "./images/dollar-sign.svg";

import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import { CustomersPage } from "./pages/CustomersPage";

const navLinks = [
  {
    path: "/home",
    name: "Home",
    img: HomeIcon,
    alt: "Ícone da home",
  },
  {
    path: "/charges",
    name: "Cobranças",
    img: BillingIcon,
    alt: "Ícone criar cobrança",
  },
  {
    path: "/customers",
    name: "Clientes",
    img: CustomersIcon,
    alt: "Ícone clientes",
  },
];

export default function App() {
  const [logged, setLogged] = React.useState(true);
  const [showLogout, setShowLogout] = React.useState(false);

  return (
    <BrowserRouter>
      <Switch>
        {!logged && (
          <>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
          </>
        )}
      </Switch>
      {logged && (
        <>
          <div className="columns">
            <div className="column-menu-bar">
              <div className="logo-academy">
                <img src={LogoAcademyWhite} alt="Logo da Academy" />
              </div>
              <div className="container-list">
                {navLinks.map((nav) => {
                  return (
                    <NavLink
                      key={nav.name}
                      to={nav.path}
                      activeClassName="selected"
                    >
                      <div>
                        <img src={nav.img} alt={nav.alt} />
                        {nav.name}
                      </div>
                    </NavLink>
                  );
                })}
              </div>
              <button>Criar cobrança</button>
            </div>
            <div className="column-main">
              <div className="header">
                <div className="balance">
                  <p>
                    <img src={IconDollar} alt="Simbolo do dollar" />
                    <span>Saldo em conta</span>
                  </p>
                  <p className="value-balance">R$ 0,00</p>
                </div>
                <div className="user-menu">
                  <button
                    onClick={() => {
                      setShowLogout(!showLogout);
                    }}
                  >
                    <img src={UserIcon} alt="Ícone do usuário" />
                  </button>
                  {showLogout && (
                    <button className="logout">
                      <img src={LogoutIcon} alt="Ícone deslogar" />
                      Deslogar
                    </button>
                  )}
                </div>
              </div>
              <Switch>
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/customers" component={CustomersPage} />
              </Switch>
            </div>
          </div>
        </>
      )}
    </BrowserRouter>
  );
}
