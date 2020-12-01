import React from "react";
import "./index.css";

import UserIcon from "../../images/icon-user.svg";
import LogoutIcon from "../../images/icon-logout.svg";
import IconDollar from "../../images/dollar-sign.svg";

import { useLocation } from "react-router-dom";

import { LoginContainer } from "../../index";

export function Header() {
  const [showLogout, setShowLogout] = React.useState(false);
  const location = useLocation();
  const { logout } = LoginContainer.useContainer();

  return (
    <>
      <div
        className={
          location.pathname.includes("/customers/") ||
          location.pathname.includes("/charges/")
            ? "header modified"
            : "header"
        }
      >
        {!location.pathname.includes("/customers/") &&
        !location.pathname.includes("/charges/") ? (
          <>
            <div className="balance">
              <p>
                <img src={IconDollar} alt="Simbolo do dollar" />
                <span>Saldo em conta</span>
              </p>
              <p className="value-balance">R$ 0,00</p>
            </div>
          </>
        ) : (
          ""
        )}
        <div className="user-menu">
          <button
            onClick={() => {
              setShowLogout(!showLogout);
            }}
          >
            <img src={UserIcon} alt="Ícone do usuário" />
          </button>
          {showLogout && (
            <button className="logout" onClick={logout}>
              <img src={LogoutIcon} alt="Ícone deslogar" />
              Deslogar
            </button>
          )}
        </div>
      </div>
    </>
  );
}
