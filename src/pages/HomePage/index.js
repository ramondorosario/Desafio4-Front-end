import React from "react";
import LogoAcademyWhite from "../../images/logo-academy-white.svg";
import HomeIcon from "../../images/icon-home.svg";
import BillingIcon from "../../images/icon-billing.svg";
import CustomersIcon from "../../images/icon-customers.svg";
import UserIcon from "../../images/icon-user.svg";
import LogoutIcon from "../../images/icon-logout.svg";
import IconDollar from "../../images/dollar-sign.svg";

import { Link } from "react-router-dom";

import "./index.css";

export function HomePage() {
  const [showLogout, setShowLogout] = React.useState(false);
  const [menuSelected, setMenuSelected] = React.useState("home");

  return (
    <>
      <div className="columns">
        <div className="column-menu-bar">
          <div className="logo-academy">
            <img src={LogoAcademyWhite} alt="Logo da Academy" />
          </div>
          <div className="container-list">
            <ul>
              <li className={menuSelected === "home" ? "selected" : ""}>
                <img src={HomeIcon} alt="Ícone da home" />
                <Link
                  to="/home"
                  onClick={() => {
                    setMenuSelected("home");
                  }}
                >
                  Home
                </Link>
              </li>
              <li className={menuSelected === "charges" ? "selected" : ""}>
                <img src={BillingIcon} alt="Ícone criar cobrança" />
                <Link
                  to="/home"
                  onClick={() => {
                    setMenuSelected("charges");
                  }}
                >
                  Cobranças
                </Link>
              </li>
              <li className={menuSelected === "customers" ? "selected" : ""}>
                <img src={CustomersIcon} alt="Ícone clientes" />
                <Link
                  to="/home"
                  onClick={() => {
                    setMenuSelected("customers");
                  }}
                >
                  Clientes
                </Link>
              </li>
            </ul>
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
                <button className="logout" onClick={() => {}}>
                  {/* Rever jaja */}
                  <img src={LogoutIcon} alt="Ícone deslogar" />
                  Deslogar
                </button>
              )}
            </div>
          </div>
          <div className="container-cards">
            <div className="card">
              <div className="header-card">
                <div>
                  <img src={CustomersIcon} alt="Ícone clientes" />
                  Clientes
                </div>
              </div>
              <div className="content-card">
                <div className="data in-day">
                  <span>Em dia</span>
                  <span className="cont">0</span>
                </div>
                <div className="data defaulters">
                  <span>Inadimplentes</span>
                  <span className="cont">0</span>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="header-card">
                <div>
                  <img src={BillingIcon} alt="Ícone cobrança" />
                  Cobranças
                </div>
              </div>
              <div className="content-card">
                <div className="data expected">
                  <span>Em dia</span>
                  <span className="cont">0</span>
                </div>
                <div className="data in-day">
                  <span>Em dia</span>
                  <span className="cont">0</span>
                </div>
                <div className="data defaulters">
                  <span>Inadimplentes</span>
                  <span className="cont">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
