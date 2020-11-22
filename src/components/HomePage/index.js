import React from "react";
import "./index.css";

import CustomersIcon from "../../images/icon-customers.svg";
import BillingIcon from "../../images/icon-billing.svg";

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
  const [menuSelected, setMenuSelected] = React.useState("este mês");

  return (
    <>
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
    </>
  );
}
