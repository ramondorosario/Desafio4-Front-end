import React from "react";
import "./index.css";

import LogoAcademy from "../../images/logo-cubos.svg";
import HiddenPassword from "../../images/hidden-password.svg";
import ShowPassword from "../../images/show-password.svg";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginContainer } from "../../index";

export function LoginPage() {
  const { register, handleSubmit, watch } = useForm();
  const [hiddenPassword, setHiddenPassword] = React.useState("false");
  const { login } = LoginContainer.useContainer();

  const email = watch("email");
  const password = watch("password");

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
        <label>
          Email
          <input
            name="email"
            type="email"
            ref={register}
            placeholder="exemplo@gmail.com"
          />
        </label>
        <label className="container-password">
          Senha
          <input
            className={
              hiddenPassword ? "input-password" : "input-password teste"
            }
            name="password"
            type={hiddenPassword ? "password" : "text"}
            ref={register}
          />
          <button
            type="button"
            onClick={() => {
              setHiddenPassword(!hiddenPassword);
            }}
          >
            <img
              src={hiddenPassword ? HiddenPassword : ShowPassword}
              alt={hiddenPassword ? "Exibir senha" : "Esconder senha"}
            />{" "}
          </button>
        </label>
        <div className="forgot-password">
          <Link to="/recover-password">Esqueci minha senha</Link>
        </div>

        <button
          disabled={email && password ? false : true}
          className={email && password ? "not-disabled" : ""}
        >
          Entrar
        </button>
      </form>
      <div className="msg-signup">
        Não tem uma conta? <Link to="/signup">Cadastre-se!</Link>
      </div>
    </div>
  );
}
