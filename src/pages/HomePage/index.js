import React from "react";
import LogoAcademyWhite from "../../images/logo-academy-white.svg";
import HomeIcon from "../../images/icon-home.svg";
import BillingIcon from "../../images/icon-billing.svg";
import CustomersIcon from "../../images/icon-customers.svg";
import UserIcon from "../../images/icon-user.svg";
import LogoutIcon from "../../images/icon-logout.svg";
import IconDollar from "../../images/dollar-sign.svg";

import { NavLink } from "react-router-dom";

import "./index.css";

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

function MenuButton(props) {
  const { menuSelected, setMenuSelected, children, name } = props;
  return (
    <button
      className={menuSelected === name ? "menu-selected" : ""}
      onClick={() => {
        setMenuSelected(name);
      }}
    >
      {children}
    </button>
  );
}

export function HomePage() {
  const [showLogout, setShowLogout] = React.useState(false);
  const [menuSelected, setMenuSelected] = React.useState("este mês");

  return (
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
          <div className="menu-cards">
            <MenuButton
              menuSelected={menuSelected}
              setMenuSelected={setMenuSelected}
              children="Este mês"
              name="este mês"
            />
            <MenuButton
              menuSelected={menuSelected}
              setMenuSelected={setMenuSelected}
              children="Este ano"
              name="este ano"
            />
            <MenuButton
              menuSelected={menuSelected}
              setMenuSelected={setMenuSelected}
              children="Desde o início"
              name="desde o início"
            />
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
                  <span>Previsto</span>
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
