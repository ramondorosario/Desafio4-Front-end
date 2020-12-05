import React from "react";
import "../LoginPage/index";

import LogoAcademy from "../../images/logo-cubos.svg";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginContainer } from "../../index";

export function RecoverPassword() {
  const { register, handleSubmit, watch } = useForm();
  const { login } = LoginContainer.useContainer();

  const email = watch("email");

  return (
    <div className="container-form">
      <form
        className="form"
        onSubmit={handleSubmit((data) => {
          const { email, password } = data;
          login(email, password);
        })}
      >
        <img src={LogoAcademy} alt="Logo da Academy" />
        <span className="text">
          Informe o e-mail associado a sua conta e vamos te enviar instruções
          para resetar sua senha
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
  );
}
