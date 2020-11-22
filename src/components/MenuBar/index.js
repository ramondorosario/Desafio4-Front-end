import React from "react";
import "./index.css";

import LogoAcademyWhite from "../../images/logo-academy-white.svg";
import HomeIcon from "../../images/icon-home.svg";
import CustomersIcon from "../../images/icon-customers.svg";
import BillingIcon from "../../images/icon-billing.svg";

import { NavLink, useHistory } from "react-router-dom";

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

export function MenuBar() {
  const History = useHistory();

  return (
    <>
      <div className="logo-academy">
        <img src={LogoAcademyWhite} alt="Logo da Academy" />
      </div>
      <div className="container-list">
        {navLinks.map((nav) => {
          return (
            <NavLink key={nav.name} to={nav.path} activeClassName="selected">
              <div>
                <img src={nav.img} alt={nav.alt} />
                {nav.name}
              </div>
            </NavLink>
          );
        })}
      </div>
      <button
        onClick={() => {
          History.push("/charges/new-charge");
        }}
      >
        Criar cobrança
      </button>
    </>
  );
}
