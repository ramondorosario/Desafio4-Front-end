/* eslint-disable no-unused-vars */
import React from "react";
import "../LoginPage/index";

import LogoAcademy from "../../images/logo-cubos.svg";
import IconEmail from "../../images/email-icon.svg";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export function RecoverPassword() {
  const { register, handleSubmit, watch } = useForm();
  const [clickedRecover, setClickedRecover] = React.useState(false);
  const History = useHistory();
  const email = watch("email");

  return (
    <>
      {!clickedRecover ? (
        <div className="container-form">
          <form
            className="form"
            onSubmit={handleSubmit((data) => {
              const { email } = data;
              setClickedRecover(true);
            })}
          >
            <img src={LogoAcademy} alt="Logo da Academy" />
            <span className="text">
              Informe o e-mail associado a sua conta e vamos te enviar
              instruções para resetar sua senha
            </span>
            <label>
              Email
              <input
                name="email"
                type="email"
                ref={register}
                placeholder="exemplo@gmail.com"
              />
            </label>
            <button
              disabled={email ? false : true}
              className={email ? "not-disabled" : ""}
            >
              Recuperar senha
            </button>
          </form>
        </div>
      ) : (
        <div className="container">
          <div className="content">
            <img src={LogoAcademy} alt="Logo da Academy" />
            <img src={IconEmail} className="main-img" alt="Icone do email" />
            <h3>Confira seu email</h3>
            <span className="text">
              Enviamos as instruções para recuperação de senha
            </span>

            <button
              onClick={() => {
                History.push("/login");
              }}
            >
              Ok, entendi
            </button>
          </div>
        </div>
      )}
    </>
  );
}
